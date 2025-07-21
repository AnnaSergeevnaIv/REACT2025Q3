import { clear, selectCount } from '../../store/counter-slice';
import { FOOTER_CLASS, FOOTER_TEXT_CLASS } from './Footer.constants';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch';
export function Footer() {
  const checkedCount = useAppSelector(selectCount);
  const dispatch = useAppDispatch();
  const unselectClickHandle = () => {
    dispatch(clear());
  };
  return checkedCount !== 0 ? (
    <footer className={FOOTER_CLASS}>
      <h2 className={FOOTER_TEXT_CLASS}>
        Number of selected characters - {checkedCount}
      </h2>
      <button onClick={unselectClickHandle}>Unselect All</button>
      <button>Download</button>
    </footer>
  ) : (
    <></>
  );
}
