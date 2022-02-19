import { INotificationModel } from "notification";
import { IPostModel } from "post";
import { ICommentModel } from "comment";
import { IUserModel } from "user";
import webpush from "web-push";
import config from "../config";
import { Comment, Notification, Post, User } from "../models";

function makeLink(postId: string, commentId: string): string {
  return `/posts/${postId}#comment-${commentId}`;
}

export default class NotificationService {
  private NotificationModel: INotificationModel;

  private PostModel: IPostModel;

  private CommentModel: ICommentModel;

  private UserModel: IUserModel;

  constructor() {
    this.NotificationModel = Notification;
    this.PostModel = Post;
    this.CommentModel = Comment;
    this.UserModel = User;
  }

  /**
   * 댓글 등록시 알림 등록
   * @param postId 알림 등록된 포스트
   * @param commentId 생성된 댓글 혹은 답글이 달린 댓글
   */
  async addCommentNotification(
    loginUserId: string,
    postId: string,
    commentId: string
  ) {
    // 자신의 글일 경우 알림 등록 하지 않음.
    const post = await this.PostModel.findPostById(postId);
    const userId = post.author.id;
    if (userId === loginUserId) {
      return;
    }

    const { title } = post;
    const to = makeLink(postId, commentId);
    const flag = "comment";
    await this.NotificationModel.addNotification(userId, to, title, flag);
    await this.UserModel.updateNotification(userId, true);

    const subscriptions = await this.UserModel.findAllSubscriptions(userId);
    const payload = {
      title,
      to: `${config.domain}/${to}`,
      flag,
    };
    subscriptions.forEach((subscription) => {
      webpush.sendNotification(subscription, JSON.stringify(payload), {
        gcmAPIKey: config.privateVapidKey,
        TTL: 60,
      });
    });
  }

  /**
   * 답글 등록시 알림 등록
   * @param postId 알림 등록된 포스트
   * @param commentId 생성된 댓글 혹은 답글이 달린 댓글
   */
  async addReplyNotification(
    loginUserId: string,
    postId: string,
    commentId: string
  ) {
    // 자신의 글일 경우 알림 등록 하지 않음.
    const post = await this.PostModel.findPostById(postId);
    const comment = await this.CommentModel.findCommentById(commentId);
    const userId = comment.author.id;
    if (userId === loginUserId) {
      return;
    }

    const { title } = post;
    const to = makeLink(postId, commentId);
    const flag = "reply";
    await this.NotificationModel.addNotification(userId, to, title, flag);
    await this.UserModel.updateNotification(userId, true);

    const subscriptions = await this.UserModel.findAllSubscriptions(userId);
    const payload = {
      title,
      to: `${config.domain}/${to}`,
      flag,
    };
    subscriptions.forEach((subscription) => {
      webpush.sendNotification(subscription, JSON.stringify(payload), {
        gcmAPIKey: config.privateVapidKey,
        TTL: 60,
      });
    });
  }

  /**
   * 유저 알림 목록 조회, 확인된 알림 읽음 처리, 오래된 알림 제거
   * @param userId 유저 정보
   * @returns 알림 리스트
   */
  async findAllNotification(userId: string) {
    const notification = this.NotificationModel.findAllNotification(userId);
    await this.NotificationModel.updateNotification(userId);
    await this.UserModel.updateNotification(userId, false);
    return notification;
  }
}
