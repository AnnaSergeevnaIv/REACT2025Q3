import {
  PAGINATION_BUTTON_CONTAINER_CLASS,
  PAGINATION_BUTTON_NEXT_NAME,
  PAGINATION_BUTTON_PREV_NAME,
} from './Pagination.constants';

export type PaginationProps = {
  onClick: (next: boolean) => void;
  nextDisabled: boolean;
  prevDisabled: boolean;
};
export function Pagination({
  onClick,
  nextDisabled,
  prevDisabled,
}: PaginationProps) {
  return (
    <div className={PAGINATION_BUTTON_CONTAINER_CLASS}>
      <button
        onClick={() => {
          onClick(false);
        }}
        disabled={prevDisabled}
      >
        {PAGINATION_BUTTON_PREV_NAME}
      </button>
      <button
        onClick={() => {
          onClick(true);
        }}
        disabled={nextDisabled}
      >
        {PAGINATION_BUTTON_NEXT_NAME}
      </button>
    </div>
  );
}
