import {
  stateCleared,
  selectCheckedCharacters,
} from '../../store/characterSlice';
import {
  FOOTER_CLASS,
  FOOTER_DOWNLOAD_BUTTON_NAME,
  FOOTER_TEST_ID,
  FOOTER_TEXT_CLASS,
  FOOTER_UNCHECK_BUTTON_NAME,
} from './Footer.constants';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { downloadCSV } from '../../services/csv-export';
export function Footer() {
  const checkedCharacters = useAppSelector(selectCheckedCharacters);
  const checkedCount = checkedCharacters.length;
  const dispatch = useAppDispatch();
  const unselectClickHandle = () => {
    dispatch(stateCleared());
  };
  return checkedCount !== 0 ? (
    <footer className={FOOTER_CLASS} data-testid={FOOTER_TEST_ID}>
      <h2 className={FOOTER_TEXT_CLASS}>
        Number of selected characters - {checkedCount}
      </h2>
      <button onClick={unselectClickHandle}>
        {FOOTER_UNCHECK_BUTTON_NAME}
      </button>
      <button
        onClick={() => {
          downloadCSV(checkedCharacters, checkedCount);
        }}
      >
        {FOOTER_DOWNLOAD_BUTTON_NAME}
      </button>
    </footer>
  ) : (
    <></>
  );
}
