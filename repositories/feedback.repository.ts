import {AppDataSource} from "../config/database";
import {Feedback, Message, ReplyFeedback} from "../models/message";

export const MessageRepository = AppDataSource.getRepository(Message);
export const FeedbackRepository = AppDataSource.getRepository(Feedback);
export const ReplyFeedbackRepository = AppDataSource.getRepository(ReplyFeedback);
