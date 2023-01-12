import {
  doc,
  collection,
  query,
  getDocs,
  getFirestore,
  Timestamp,
  addDoc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { firebase_app } from "../db.js";
import News from "../models/news_model.js";
const fireStore = getFirestore(firebase_app);

/**
 * C.R.U.D
 */
export const add_news = async (req, res, next) => {
  try {
    await addDoc(collection(fireStore, "news"), {
      content: req.body.content,
      date: Timestamp.fromDate(new Date()),
    });

    return {
      success: 201,
      message: "News added successfully",
    };
  } catch (error) {
    return {
      success: 400,
      message: "Failed adding news",
      detail: error.message,
    };
  }
};
export const get_all_news = async () => {
  try {
    const news = collection(fireStore, "news");
    const q = query(news);
    const query_snapshot = await getDocs(q);
    const news_out = [];
    query_snapshot.forEach((doc) => {
      const d = doc.data();
      d.id = doc.id;
      d.date = new Date(d.date.toDate()).toLocaleDateString("en-GB");
      news_out.push(new News(d.id, d.content, d.date));
    });
    return news_out;
  } catch (error) {
    return {
      status: 400,
      message: "Failed getting all news",
      detail: error.message,
    };
  }
};
export const update_news = async (req, res, next) => {
  try {
    await updateDoc(doc(fireStore, "news", req.body.news_id), {
      content: req.body.content,
    });

    return {
      success: 201,
      message: "News updated successfully",
    };
  } catch (error) {
    return {
      success: 400,
      message: "Failed updating news",
      detail: error.message,
    };
  }
};
export const delete_news = async (req, res, next) => {
  try {
    await deleteDoc(doc(fireStore, "news", req.body.news_id));
    return {
      success: 201,
      message: "News deleted successfully",
    };
  } catch (error) {
    return {
      success: 400,
      message: "Failed deleting news",
      detail: error.message,
    };
  }
};
