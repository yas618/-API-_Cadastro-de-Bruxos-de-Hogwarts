import express from "express";
import { 
  createBruxo, 
  deleteBruxo, 
  getAllBruxos, 
  getBruxoById, 
  updateBruxo 
} from "../controllers/controllersHarry.js";

const router = express.Router();

router.get("/", getAllBruxos);
router.get("/:id", getBruxoById);
router.post("/", createBruxo);
router.put("/:id", updateBruxo);
router.delete("/:id", deleteBruxo);

export default router;
