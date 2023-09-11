// import axios from "axios";

// export const creatematerialmaster =
//   (materialName, description, isActive) => async (dispatch) => {
//     try {
//       dispatch({
//         type: "materialNameCretaRequest",
//       });
//       const { data } = await axios.post(
//         "/materialmaster/create-materialmaster",
//         materialName,
//         description,
//         isActive
//       );
//       dispatch({
//         type: "materialCreateSuccess",
//         payload: data.materialmaster,
//       });
//     } catch (error) {
//       dispatch({
//         type: "materialCreateFail",
//         payload: error.response.data.message,
//       });
//     }
//   };
// export const deleteMaterialMaster = (id) => async (dispatch) => {
//   try {
//     dispatch({
//       type: "deleteMaterialMasterRequest",
//     });

//     const { data } = await axios.delete(
//       // `${server}/unitmaster/delete-unitmaster/${id}`,
//       `/materialmaster/delete-materialmaster/${id}`

//       // {
//       //     withCredentials: true,
//       // }
//     );

//     dispatch({
//       type: "deleteMaterialMasterSuccess",
//       payload: data.materialmaster,
//     });
//   } catch (error) {
//     dispatch({
//       type: "deleteMaterialMasterFailed",
//       payload: error.response.data.message,
//     });
//   }
// };
// export const getAllMaterialMaster = () => async (dispatch) => {
//   try {
//     dispatch({
//       type: "getAllMaterialMasterRequest",
//     });

//     const { data } = await axios.get(`/materialmaster/get-materialmaster`);
//     // debugger;
//     console.log(data);
//     dispatch({
//       type: "getAllMaterialMasterSuccess",
//       payload: data.materialmaster,
//     });
//   } catch (error) {
//     dispatch({
//       type: "getAllMaterialMasterFailed",
//       payload: error.response.data.message,
//     });
//   }
// };
