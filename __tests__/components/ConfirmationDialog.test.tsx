import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ConfirmationDialog } from '@/components/Common/ConfirmationDialog';

describe('ConfirmationDialog Component', () => {
  it('renders trigger correctly', () => {
    render(
      <ConfirmationDialog
        trigger={<button>Open Dialog</button>}
        title="Confirm Action"
        description="Are you sure?"
        onConfirm={vi.fn()}
      />
    );

    expect(screen.getByText('Open Dialog')).toBeInTheDocument();
  });

  it('renders dialog content when trigger is clicked', async () => {
    render(
      <ConfirmationDialog
        trigger={<button>Open Dialog</button>}
        title="Confirm Action"
        description="Are you sure?"
        onConfirm={vi.fn()}
      />
    );

    // Dialog content should not be visible initially
    expect(screen.queryByText('Confirm Action')).not.toBeInTheDocument();

    // Click the trigger
    fireEvent.click(screen.getByText('Open Dialog'));

    // Wait for the dialog to open and become visible
    await waitFor(() => {
      expect(screen.getByText('Confirm Action')).toBeInTheDocument();
      expect(screen.getByText('Are you sure?')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /ยืนยัน/i })).toBeInTheDocument();
    });
  });

  it('calls onConfirm when confirm button is clicked', async () => {
    const onConfirmMock = vi.fn().mockResolvedValue(undefined);
    
    render(
      <ConfirmationDialog
        trigger={<button>Open Dialog</button>}
        title="Confirm Action"
        description="Are you sure?"
        onConfirm={onConfirmMock}
        confirmLabel="Yes, do it"
      />
    );

    // Open dialog
    fireEvent.click(screen.getByText('Open Dialog'));

    // Wait for the dialog to open
    const confirmButton = await screen.findByRole('button', { name: 'Yes, do it' });
    
    // Click confirm
    fireEvent.click(confirmButton);

    // Wait for the action to be called
    await waitFor(() => {
      expect(onConfirmMock).toHaveBeenCalledTimes(1);
    });
  });
});
