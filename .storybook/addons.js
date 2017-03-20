// In order to use Storybook's Add-Ons we have to manually reference the
// add-ons we care about from this file.
//
// More information:
// https://getstorybook.io/docs/react-storybook/addons/introduction
// https://github.com/storybooks/storybook-addon-knobs

// Include Storybook's built-in addons (actions and links)
import '@kadira/storybook/addons';

// Include the "knobs" add-on to support dynamically editing React props
import '@kadira/storybook-addon-knobs/register';
