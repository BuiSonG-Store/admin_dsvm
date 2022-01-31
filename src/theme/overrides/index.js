import { merge } from 'lodash';
import card from './Card';
import lists from './Lists';
import paper from './Paper';
import input from './Input';
import button from './Button';
import tooltip from './Tooltip';
import backdrop from './Backdrop';
import typography from './Typography';
import iconButton from './IconButton';
import autocomplete from './Autocomplete';

// ----------------------------------------------------------------------

export default function ComponentsOverrides(theme) {
    return merge(
        card(theme),
        lists(theme),
        paper(theme),
        input(theme),
        button(theme),
        tooltip(theme),
        backdrop(theme),
        typography(theme),
        iconButton(theme),
        autocomplete(theme)
    );
}
