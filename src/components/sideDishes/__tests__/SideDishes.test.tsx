import { screen } from '@testing-library/react';
import { graphql } from 'msw';

import { renderWithProviders } from '../../../lib/test/renderWithProviders';
import { SideDish } from '../../../types';
import { server } from '../../../lib/test/msw-server';
import { createTestSideDish } from '../../../lib/test/helper/sideDish';
import SideDishes from '../SideDishes';

describe('SideDishes', () => {
  const renderSideDishList = () => {
    const view = renderWithProviders(<SideDishes />);

    return {
      ...view,
      $findSideDishItems: () => screen.findAllByTestId(/^sideDish-item-/),
      $findSideDishItemsButtons: () => screen.findAllByRole('button'),
    };
  };

  const mockSideDishesQuery = (data: Partial<SideDish[]>) => {
    server.use(
      graphql.query('SideDishes', (_request, response, context) => {
        return response(
          context.data({
            loading: false,
            sideDishes: [...data],
          })
        );
      })
    );
  };

  beforeEach(() => {
    const sideDish1 = createTestSideDish();
    const sideDish2 = createTestSideDish();
    mockSideDishesQuery([sideDish1, sideDish2]);
  });

  test('should display a list of sideDishes', async () => {
    const { $findSideDishItems } = renderSideDishList();

    expect(await $findSideDishItems()).toHaveLength(2);
  });
});
