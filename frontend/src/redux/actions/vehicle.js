// import axios from "axios";
// import { server } from "../../server";

// // create unitmaster product
// export const createvehicle =
//   (
//     vehicleId,
//     licensePlateNumber,
//     vehicleModel,
//     vehicleOwnerName,
//     royalty,
//     vehicleWeight,
//     vehicleTypes,
//     vehicleFuelTypes
//   ) =>
//   async (dispatch) => {
//     try {
//       dispatch({
//         type: "vehicleCreateRequest",
//       });

//       const { data } = await axios.post(
//          `${server}/vehicle/create-vehicle`,
//         // `/vehicle/create-vehicle`,
//         vehicleId,
//         licensePlateNumber,
//         vehicleModel,
//         vehicleOwnerName,
//         royalty,
//         vehicleWeight,
//         vehicleTypes,
//         vehicleFuelTypes
//       );
//       dispatch({
//         type: "vehicleCreateSuccess",
//         payload: data.vehicle,
//       });
//     } catch (error) {
//       dispatch({
//         type: "vehicleCreateFail",
//         payload: error.response.data.message,
//       });
//     }
//   };

// // delete product of a shop
// export const deleteVehicle = (id) => async (dispatch) => {
//   try {
//     dispatch({
//       type: "deleteVehicleRequest",
//     });

//     const { data } = await axios.delete(`/vehicle/delete-vehicle/${id}`);

//     dispatch({
//       type: "deleteVehicleSuccess",
//       payload: data.vehicle,
//     });
//   } catch (error) {
//     dispatch({
//       type: "deleteVehicleFailed",
//       payload: error.response.data.message,
//     });
//   }
// };

// // get all Unit of Stone Crusher
// export const getAllVehicle = () => async (dispatch) => {
//   try {
//     dispatch({
//       type: "getAllVehicleRequest",
//     });

//     const { data } = await axios.get(
//       `${server}/vehicle/get-vehicle`,
//       // `/vehicle/get-vehicle`
//       );

//     console.log(data);
//     dispatch({
//       type: "getAllVehicleSuccess",
//       payload: data.vehicle,
//     });
//   } catch (error) {
//     dispatch({
//       type: "getAllVehicleFailed",
//       payload: error.response.data.message,
//     });
//   }
// };
