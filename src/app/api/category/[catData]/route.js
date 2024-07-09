import {
  getCategoryByIdOrName,
  updateCategory,
} from "@/lib/prisma/category-prisma";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  const payload = await getCategoryByIdOrName(params.catData);
  // validate
  // if category is found in database
  if (payload != null)
    return NextResponse.json(
      {
        status: 200,
        // dynamic message response
        messeage: `Get Category ${
          isNaN(params.catData)
            ? "name : " + params.catData
            : "id : " + params.catData
        }  successfully`,
        payload,
      },
      { status: 200 }
    );
  else
    return NextResponse.json(
      {
        status: 404,
        messeage: `Category ${
          isNaN(params.catData)
            ? "name : " + params.catData
            : "id : " + params.catData
        } is Not Found`,
      },
      { status: 404 }
    );
};

export const PUT = async (req, { params }) => {
  const body = await req.json();
  const id = parseInt(params.catData);

  // get category by id before updating (if client input id which does not exist in database, we can validate)

  const category = await getCategoryByIdOrName(id);
  if (category != null) {
    const payload = await updateCategory(id, body);
    return NextResponse.json(
      {
        status: 200,
        messeage: `Update Category id ${id} successfully`,
        payload,
      },
      { status: 200 }
    );
  } else {
    return NextResponse.json(
      {
        status: 404,
        messeage: `Category id ${id} is Not Found`,
      },
      { status: 404 }
    );
  }
};
