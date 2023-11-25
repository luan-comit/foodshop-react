import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithProviders } from '../../../lib/test/renderWithProviders';
import { createTestBrokenRice } from '../../../lib/test/helper/brokenRice';
import BrokenRiceItem, { BrokenRiceItemProps } from '../BrokenRiceItem';
import toDollars from '../../../lib/format-dollars';

describe('BrokenRiceItem', () => {
  const renderBrokenRiceList = (props: BrokenRiceItemProps) => {
    const view = renderWithProviders(<BrokenRiceItem {...props} />);

    return {
      ...view,
      $getPrice: () => screen.getByTestId(/^brokenRice-price/),
      $getDescription: () => screen.getByTestId(/^brokenRice-description/),
      $getSideDishes: () => screen.getByTestId(/^brokenRice-sideDishes/),
      $getImage: () => screen.getByTestId(/^brokenRice-image/),
      $getModifyButton: () => screen.getByRole('button'),
      $getBrokenRiceName: () => screen.getByTestId(/^brokenRice-name-value/),
      $getBrokenRiceDescription: () => screen.getByTestId(/^brokenRice-name-value/),
    };
  };

  const props = {
    handleOpen: jest.fn(),
    brokenRice: createTestBrokenRice(),
  };

  test('should display all components of the brokenRice item and all component contain correct values', async () => {
    const { $getBrokenRiceName, $getPrice, $getModifyButton, $getDescription, $getSideDishes, $getImage } =
      renderBrokenRiceList(props);

    expect($getBrokenRiceName()).toBeVisible();
    expect($getBrokenRiceName().innerHTML).toContain(props.brokenRice.name);
    expect($getDescription()).toBeVisible();
    expect($getDescription().innerHTML).toContain(props.brokenRice.description);
    expect($getSideDishes()).toBeVisible();
    expect($getSideDishes().innerHTML).toContain(props.brokenRice.sideDishes[0].name);
    expect($getPrice()).toBeVisible();
    expect($getPrice().innerHTML).toContain(toDollars(props.brokenRice.priceCents));
    expect($getImage()).toBeVisible();
    expect($getModifyButton()).toBeVisible();
  });

  test('should call handleOpen when the modify button is clicked', async () => {
    const { $getModifyButton } = renderBrokenRiceList(props);

    userEvent.click($getModifyButton());

    expect(props.handleOpen).toHaveBeenCalledTimes(1);
  });
});
