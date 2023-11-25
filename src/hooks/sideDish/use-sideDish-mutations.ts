import { useCallback } from 'react';
import { useMutation } from '@apollo/client';

import { GET_SIDE_DISHES } from '../graphql/sideDish/queries/get-sideDishes';
import { CREATE_SIDE_DISH } from '../graphql/sideDish/mutations/create-sideDish';
import { DELETE_SIDE_DISH } from '../graphql/sideDish/mutations/delete-sideDish';
import { UPDATE_SIDE_DISH } from '../graphql/sideDish/mutations/update-sideDish';

interface UseSideDishMutationsOutput {
  onCreateSideDish: (selectedSideDish: any) => void;
  onDeleteSideDish: (selectedSideDish: any) => Promise<void>;
  onUpdateSideDish: (selectedSideDish: any) => void;
}

const useSideDishMutations = (): UseSideDishMutationsOutput => {
  const [createSideDish] = useMutation(CREATE_SIDE_DISH, { refetchQueries: [GET_SIDE_DISHES, 'SideDishes'] });
  const [deleteSideDish] = useMutation(DELETE_SIDE_DISH, { refetchQueries: [GET_SIDE_DISHES, 'SideDishes'] });
  const [updateSideDish] = useMutation(UPDATE_SIDE_DISH);

  const onCreateSideDish = useCallback(
    (selectedSideDish) => {
      try {
        createSideDish({
          variables: {
            createSideDishInput: {
              name: selectedSideDish.name,
              priceCents: selectedSideDish.priceCents,
            },
          },
        });
      } catch (err) {
        console.log(err);
      }
    },
    [createSideDish]
  );

  const onDeleteSideDish = useCallback(
    async (selectedSideDish) => {
      try {
        await deleteSideDish({
          variables: {
            deleteSideDishInput: {
              id: selectedSideDish.id,
            },
          },
        });
      } catch (err) {
        console.log(err);
      }
    },
    [deleteSideDish]
  );

  const onUpdateSideDish = useCallback(
    (selectedSideDish) => {
      try {
        updateSideDish({
          variables: {
            updateSideDishInput: {
              id: selectedSideDish.id,
              name: selectedSideDish?.name,
              priceCents: selectedSideDish?.priceCents,
            },
          },
        });
      } catch (err) {
        console.log(err);
      }
    },
    [updateSideDish]
  );

  return { onCreateSideDish, onDeleteSideDish, onUpdateSideDish };
};

export default useSideDishMutations;
