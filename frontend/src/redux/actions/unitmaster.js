import axios from 'axios';
import { server } from '../../server';

// create unitmaster product
export const createunitmaster =
    (unitmasterId, unitName, unitShortName, description) => async (dispatch) => {
        try {
            dispatch({
                type: "unitmasterCreateRequest",
            });

            const { data } = await axios.post(
                // `${server}/unitmaster/create-unitmaster`,
                `/unitmaster/create-unitmaster`,
                unitmasterId,
                unitName,
                unitShortName,
                description
            );
            console.log(data);
            if (data?.success === true) {
                dispatch({
                    type: "unitmasterCreateSuccess",
                    payload: data.unitmaster,
                });
            }

        } catch (error) {
            dispatch({
                type: "unitmasterCreateFail",
                payload: error.response.data.message,
            });
        }
    };

// delete product of a shop
export const deleteUnitMaster = (id) => async (dispatch) => {
    try {
        dispatch({
            type: 'deleteUnitMasterRequest',
        });

        const { data } = await axios.delete(
            // `${server}/unitmaster/delete-unitmaster/${id}`,
            `/unitmaster/delete-unitmaster/${id}`

            // {
            //     withCredentials: true,
            // }
        );

        dispatch({
            type: 'deleteUnitMasterSuccess',
            payload: data.unitmaster,
        });
    } catch (error) {
        dispatch({
            type: 'deleteUnitMasterFailed',
            payload: error.response.data.message,
        });
    }
};

// get all Unit of Stone Crusher
export const getAllUnitMaster = () => async (dispatch) => {
    try {
        dispatch({
            type: 'getAllUnitMasterRequest',
        });

        const { data } = await axios.get(`/unitmaster/get-unitmasters`);

        console.log(data);
        dispatch({
            type: "getAllUnitMasterSuccess",
            payload: data.unitmasters,
        });
    } catch (error) {
        dispatch({
            type: "getAllUnitMasterFailed",
            payload: error.response.data.message,
        });
    }
};


export const updateUnitMaster = (unitmasterId, unitData) => async (dispatch) => {
    try {
        dispatch({
            type: "unitmasterUpdateRequest",
        });
        const { data } = await axios.get(`/unitmaster/update-unitmaster/${unitmasterId}`, unitData);
        dispatch({
            type: "unitmasterUpdateSuccess",
            payload: data.updatedUnitMaster,
        });
    } catch (error) {
        dispatch({
            type: "getAllUnitMasterFailed",
            payload: error.response.data.message,
        });
    }
};


