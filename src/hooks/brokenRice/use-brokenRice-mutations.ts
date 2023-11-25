import { useCallback } from 'react';
import { useMutation } from '@apollo/client';

import { GET_BROKEN_RICES } from '../graphql/brokenRice/queries/get-brokenRices';
import { CREATE_BROKEN_RICE } from '../graphql/brokenRice/mutations/create-brokenRice';
import { DELETE_BROKEN_RICE } from '../graphql/brokenRice/mutations/delete-brokenRice';
import { UPDATE_BROKEN_RICE } from '../graphql/brokenRice/mutations/update-brokenRice';

interface UseBrokenRiceMutationsOutput {
  onCreateBrokenRice: (selectedBrokenRice: any) => void;
  onDeleteBrokenRice: (selectedBrokenRice: any) => Promise<void>;
  onUpdateBrokenRice: (selectedBrokenRice: any) => void;
}

const useBrokenRiceMutations = (): UseBrokenRiceMutationsOutput => {
  const [createBrokenRice] = useMutation(CREATE_BROKEN_RICE, { refetchQueries: [GET_BROKEN_RICES, 'BrokenRices'] });
  const [deleteBrokenRice] = useMutation(DELETE_BROKEN_RICE, { refetchQueries: [GET_BROKEN_RICES, 'BrokenRices'] });
  const [updateBrokenRice] = useMutation(UPDATE_BROKEN_RICE, { refetchQueries: [GET_BROKEN_RICES, 'BrokenRices'] });

  const onCreateBrokenRice = useCallback(
    (selectedBrokenRice) => {
      try {
        const createBrokenRiceInput = {
          name: selectedBrokenRice.name,
          description: selectedBrokenRice.description,
          imgSrc: selectedBrokenRice.imgSrc,
          sideDishIds: selectedBrokenRice.sideDishIds,
        };
        createBrokenRice({
          variables: { createBrokenRiceInput: createBrokenRiceInput },
        });
      } catch (err) {
        console.log(err);
      }
    },
    [createBrokenRice]
  );

  const onDeleteBrokenRice = useCallback(
    async (selectedBrokenRice) => {
      try {
        await deleteBrokenRice({
          variables: {
            deleteBrokenRiceInput: {
              id: selectedBrokenRice.id,
            },
          },
        });
      } catch (err) {
        console.log(err);
      }
    },
    [deleteBrokenRice]
  );

  const onUpdateBrokenRice = useCallback(
    (selectedBrokenRice) => {
      try {
        updateBrokenRice({
          variables: {
            updateBrokenRiceInput: {
              id: selectedBrokenRice.id,
              name: selectedBrokenRice?.name,
              description: selectedBrokenRice.description,
              imgSrc: selectedBrokenRice.imgSrc,
              sideDishIds: selectedBrokenRice.sideDishIds,
            },
          },
        });
      } catch (err) {
        console.log(err);
      }
    },
    [updateBrokenRice]
  );

  return { onCreateBrokenRice, onDeleteBrokenRice, onUpdateBrokenRice };
};

export default useBrokenRiceMutations;
