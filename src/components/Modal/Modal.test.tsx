import { render, screen, waitFor } from '@testing-library/react';
import Modal from './Modal';
import userEvent from '@testing-library/user-event';
import {
  MODAL_CONTENT_TEXT_ID,
  MODAL_OVERLAY_TEXT_ID,
} from './Modal.constants';

describe('Modal component', () => {
  const onClose = vi.fn();
  const props = {
    onClose: onClose,
    isOpen: true,
    children: <div data-testId="test"></div>,
  };
  beforeEach(() => {
    vi.clearAllMocks();
  });
  test('Should render with test children and truthy onClose prop', () => {
    render(<Modal {...props} />);
    expect(screen.getByTestId('test')).toBeInTheDocument();
  });
  test("Shouldn't render with test children and falsy onClose prop", () => {
    const closeProps = { ...props, isOpen: false };
    render(<Modal {...closeProps} />);
    expect(screen.queryByTestId('test')).not.toBeInTheDocument();
  });

  test('Should call onClose when click on overlay container', async () => {
    render(<Modal {...props} />);
    userEvent.click(screen.getByTestId(MODAL_OVERLAY_TEXT_ID));
    await waitFor(() => {
      expect(onClose).toHaveBeenCalled();
    });
  });

  test("Shouldn't call onClose when click on content container", async () => {
    render(<Modal {...props} />);
    userEvent.click(screen.getByTestId(MODAL_CONTENT_TEXT_ID));
    await waitFor(() => {
      expect(onClose).not.toHaveBeenCalled();
    });
  });
  test('Should call onClose when escape key has pressed', async () => {
    render(<Modal {...props} />);
    userEvent.keyboard('{Escape}');
    await waitFor(() => {
      expect(onClose).toHaveBeenCalled();
    });
  });
});
