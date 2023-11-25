import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithProviders } from '../../../lib/test/renderWithProviders';
import { createTestSideDish } from '../../../lib/test/helper/sideDish';
import SideDishItem, { SideDishItemProps } from '../SideDishItem';

describe('SideDishItem', () => {
  const renderSideDishList = (props: SideDishItemProps) => {
    const view = renderWithProviders(<SideDishItem {...props} />);

    return {
      ...view,
      $getPrice: () => screen.getByTestId(/^sideDish-price/),
      $getName: () => screen.getByTestId(/^sideDish-name/),
      $getModifyButton: () => screen.getByRole('button'),
    };
  };

  const props = {
    handleOpen: jest.fn(),
    sideDish: createTestSideDish(),
  };

  test('should display all components of the sideDish item', async () => {
    const { $getPrice, $getName, $getModifyButton } = renderSideDishList(props);

    expect($getPrice()).toBeVisible();
    expect($getName()).toBeVisible();
    expect($getModifyButton()).toBeVisible();
  });

  test('should call handleOpen when the modify button is clicked', async () => {
    const { $getModifyButton } = renderSideDishList(props);

    userEvent.click($getModifyButton());

    expect(props.handleOpen).toHaveBeenCalledTimes(1);
  });
});
