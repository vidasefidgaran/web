"use server";

import { Axios } from "@/lib/axios/axios";
import { requestHandler } from "@/lib/axios/requestHandler";
import { boolean, date, number, string, z } from "zod";



type TParams = string;

const schema = z.object({
  id: number(),
  baseRegionName: string().optional(),
  baseTreeTypeName: string().optional(),
  baseTreeKindName: string().optional(),
  baseTreeNatureName: string().optional(),
  baseTreeIrrigationTypeName: string().optional(),
  baseTreeGardenName: number().optional(),
  streetName: string().optional(),
  treeObjectID: number().optional(),
  code: number().optional(),
  treeTag: string().optional(),
  address: boolean().optional(),
  treeYear: number().optional(),
  treeDate: number().optional(),
  shamsiTreeDate: string().optional(),
  treeDiagonal: number().optional(),
  treeLat: number().optional(),
  treeLong: number().optional(),
  x: number(),
  y: number(),
  note: boolean().optional(),
  status: number().optional(),
  archive: boolean().optional(),
  baseTreeName: string().optional(),
  priority: boolean().optional(),
  isEnabled: boolean().optional(),
  userName: string().optional(),
});
export type Ttree = z.infer<typeof schema>

export const getTree = requestHandler<TParams, Ttree>((id) => Axios.get(`/Tree/${id}`))