import * as ItemsModel from "../models/itemsModel"

export async function getList() {
  try {
    const result = await ItemsModel.getList();
    return {
      statusCode: 200,
      data: result,
    };
  } catch (e) {
    return {
      statusCode: 500,
    };
  }
}

export async function create(data: any) {
  try {
    await ItemsModel.create(data);
    return {
      statusCode: 200,
    };
  } catch (e) {
    return {
      statusCode: 500,
    };
  }
}

export async function getRecode(id: any) {
  try {
    const result: any = await ItemsModel.getRecode(id);
    if(!result.length){
      return {
        statusCode: 404,
      };
    }
    return {
      statusCode: 200,
      data: result,
    };
  } catch (e) {
    return {
      statusCode: 500,
    };
  }
}

export async function edit(data: any) {
  try {
    await ItemsModel.update(data);
    return {
      statusCode: 200,
    };
  } catch (e) {
    return {
      statusCode: 500,
    };
  }
}

export async function dataDelete(id: any){
  try {
    await ItemsModel.dataDelete(id);
    return {
      statusCode: 200,
    };
  } catch (e) {
    return {
      statusCode: 500,
    };
  }
}
