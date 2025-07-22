import { stateCleared, selectCount } from '../../store/character-slice';
import {
  FOOTER_CLASS,
  FOOTER_TEST_ID,
  FOOTER_TEXT_CLASS,
  FOOTER_UNCHECK_BUTTON_NAME,
} from './Footer.constants';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch';
export function Footer() {
  const checkedCount = useAppSelector(selectCount);
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
      <button>Download</button>
    </footer>
  ) : (
    <></>
  );
}
