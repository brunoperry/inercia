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
import InerciaEvent from "../models/events_model.js";
const fireStore = getFirestore(firebase_app);

/**
 * C.R.U.D
 */
export const add_event = async (req, res, next) => {
  try {
    await addDoc(collection(fireStore, "events"), {
      name: req.body.event_name,
      link: req.body.event_link,
      status: req.body.event_status,
      type: req.body.event_type,
    });

    return {
      success: 201,
      message: "Event added successfully",
    };
  } catch (error) {
    return {
      success: 400,
      message: "Failed adding event",
      detail: error.message,
    };
  }
};
export const get_all_events = async () => {
  try {
    const events = collection(fireStore, "events");
    const q = query(events);
    const query_snapshot = await getDocs(q);
    const events_out = [];
    query_snapshot.forEach((doc) => {
      const d = doc.data();
      d.id = doc.id;
      events_out.push(new InerciaEvent(d.id, d.name, d.link, d.type, d.status));
    });

    const events_data = {
      demoparty: events_out.filter((ev) => ev.type === "demoparty"),
      momentum: events_out.filter((ev) => ev.type === "momentum"),
    };
    return events_data;
  } catch (error) {
    return {
      status: 400,
      message: "Failed getting all events",
      detail: error.message,
    };
  }
};
export const update_event = async (req, res, next) => {
  try {
    await updateDoc(doc(fireStore, "events", req.body.event_id), {
      name: req.body.event_name,
      link: req.body.event_link,
      status: req.body.event_status,
      type: req.body.event_type,
    });

    return {
      success: 201,
      message: "Event updated successfully",
    };
  } catch (error) {
    return {
      success: 400,
      message: "Failed updating event",
      detail: error.message,
    };
  }
};
export const delete_event = async (req, res, next) => {
  try {
    await deleteDoc(doc(fireStore, "events", req.body.event_id));
    return {
      success: 201,
      message: "Event deleted successfully",
    };
  } catch (error) {
    return {
      success: 400,
      message: "Failed deleting event",
      detail: error.message,
    };
  }
};
