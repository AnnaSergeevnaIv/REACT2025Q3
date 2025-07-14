import { Link } from 'react-router';
import {
  NO_MATCH_CLASS,
  NO_MATCH_H1_CLASS,
  NO_MATCH_LINK_CLASS,
  NO_MATCH_PARAGRAPH_CLASS,
  NO_MATCH_SECTION_SPACING_CLASS,
  NO_MATCH_TEST_ID,
} from './NoMatch.constants';

export function NoMatch() {
  return (
    <div data-testid={NO_MATCH_TEST_ID} className={NO_MATCH_CLASS}>
      <h1 className={NO_MATCH_H1_CLASS}>
        404 - This is not the page you’re looking for
      </h1>
      <p className={NO_MATCH_PARAGRAPH_CLASS}>
        The Force couldn’t find what you were seeking.
      </p>
      <p className={NO_MATCH_SECTION_SPACING_CLASS}>
        Perhaps the page has gone to the Dark Side...
      </p>
      <Link to="/" className={NO_MATCH_LINK_CLASS}>
        Return to the home page and let your journey continue.
      </Link>
    </div>
  );
}
