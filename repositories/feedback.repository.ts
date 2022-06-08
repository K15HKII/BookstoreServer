import {AppDataSource} from "../config/database";
import {Feedback} from "../models/message";

export const FeedbackRepository = AppDataSource.getRepository(Feedback);
