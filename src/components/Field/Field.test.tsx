import { render, screen } from '@testing-library/react';
import Field from './Field';
import { FIELD_TEST_PROPS } from './Field.constants';

describe('Field component', () => {
  test('Field should render', () => {
    render(<Field {...FIELD_TEST_PROPS} />);
    expect(
      screen.getByRole('textbox', { name: FIELD_TEST_PROPS.name })
    ).toBeInTheDocument();
  });
  test('Field should render with error if errorIsNeeded is true', () => {
    render(<Field {...FIELD_TEST_PROPS} error="Error" />);
    expect(screen.getByText('Error')).toBeInTheDocument();
  });
  test('Field should render with error if errorIsNeeded is false', () => {
    render(<Field {...FIELD_TEST_PROPS} error="Error" errorIsNeeded={false} />);
    expect(screen.queryByText('Error')).not.toBeInTheDocument();
  });
});
