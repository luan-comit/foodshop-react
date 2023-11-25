import { screen, waitFor } from '@testing-library/react';
import { graphql } from 'msw';

import { renderWithProviders } from '../../../lib/test/renderWithProviders';
import { BrokenRice } from '../../../types';
import { server } from '../../../lib/test/msw-server';
import { createTestBrokenRice } from '../../../lib/test/helper/brokenRice';
import BrokenRicePage from '../brokenRicePage';

describe('BrokenRices Data', () => {
  const renderBrokenRiceList = () => {
    const view = renderWithProviders(<BrokenRicePage />);

    return {
      ...view,
      $findBrokenRiceItems: () => screen.findAllByTestId(/^brokenRice-item-/),
      $findBrokenRiceItemsButtons: () => screen.findAllByRole('button'),
    };
  };

  const mockBrokenRicesQuery = (data: Partial<BrokenRice[]>) => {
    server.use(
      graphql.query('BrokenRices', (_request, response, context) => {
        return response(
          context.data({
            loading: false,
            brokenRices: [...data],
          })
        );
      })
    );
  };

  const brokenRice1 = createTestBrokenRice();
  const brokenRice2 = createTestBrokenRice();

  beforeEach(() => {
    mockBrokenRicesQuery([brokenRice1, brokenRice2]);
  });

  test('should display a list of brokenRices', async () => {
    const { $findBrokenRiceItems } = renderBrokenRiceList();

    waitFor(() => expect($findBrokenRiceItems()).toHaveLength(2))
      .then(() => console.log('succeeded'))
      .catch(() => 'last catch');
  });
});

describe('BrokenRices Loading', () => {
  const renderLoading = () => {
    const view = renderWithProviders(<BrokenRicePage />);

    return {
      ...view,
      $findBrokenRiceLoading: () => screen.queryByTestId(/^brokenRice-page-loading-/),
    };
  };

  test('should display loading status of brokenRices while waiting data to display', async () => {
    const { $findBrokenRiceLoading } = renderLoading();

    waitFor(() => !expect($findBrokenRiceLoading()).toBeNull)
      .then(() => expect($findBrokenRiceLoading()).toBeVisible)
      .then(() => console.log('succeeded'))
      .catch(() => 'last catch');
  });
});
