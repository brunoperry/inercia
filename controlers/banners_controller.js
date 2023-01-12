import {
  doc,
  collection,
  query,
  getDocs,
  getFirestore,
  addDoc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { firebase_app } from "../db.js";
import Banner from "../models/banner_model.js";
const fireStore = getFirestore(firebase_app);

/**
 * C.R.U.D
 */
export const add_banner = async (req, res, next) => {
  try {
    await addDoc(collection(fireStore, "banners"), {
      image: req.body.banner_image,
      link: req.body.banner_link,
      is_active: req.body.is_active === "true",
    });

    return {
      success: 201,
      message: "Banner added successfully",
    };
  } catch (error) {
    return {
      success: 400,
      message: "Failed adding banner",
      detail: error.message,
    };
  }
};
export const get_all_banners = async () => {
  try {
    const banners = collection(fireStore, "banners");
    const q = query(banners);
    const query_snapshot = await getDocs(q);
    const banners_out = [];
    query_snapshot.forEach((doc) => {
      const d = doc.data();
      d.id = doc.id;
      banners_out.push(new Banner(d.id, d.image, d.link, d.is_active));
    });
    return banners_out;
  } catch (error) {
    return {
      status: 400,
      message: "Failed getting all banners",
      detail: error.message,
    };
  }
};
export const update_banner = async (req, res, next) => {
  try {
    console.log("active", req.body.is_active);
    await updateDoc(doc(fireStore, "banners", req.body.banner_id), {
      image: req.body.banner_image,
      link: req.body.banner_link,
      is_active: req.body.is_active === "true",
    });

    return {
      success: 201,
      message: "Banner updated successfully",
    };
  } catch (error) {
    return {
      success: 400,
      message: "Failed updating banner",
      detail: error.message,
    };
  }
};
export const delete_banner = async (req, res, next) => {
  try {
    await deleteDoc(doc(fireStore, "banners", req.body.banner_id));
    return {
      success: 201,
      message: "Banner deleted successfully",
    };
  } catch (error) {
    return {
      success: 400,
      message: "Failed deleting banner",
      detail: error.message,
    };
  }
};
