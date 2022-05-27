import * as ItemsModel from "../models/ItemsModel"

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

export async function post(data: any) {
  try {
    await ItemsModel.post(data);
    return {
      statusCode: 200,
    };
  } catch (e) {
    return {
      statusCode: 500,
    };
  }
}

export async function get(id: any) {
  try {
    const result: any = await ItemsModel.get(id);
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

export async function put(data: any) {
  try {
    await ItemsModel.put(data);
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
