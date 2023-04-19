import { CompletedTwitter, ConnectTwitter, FollowOnTwitter, Twitter } from 'src/hooks/useSignUpState';
import { ThirdPartyConnection } from './third-party-connection';

import { FaTwitter } from 'react-icons/fa';

interface Props {
  state: ConnectTwitter | FollowOnTwitter | CompletedTwitter;
}

export const TwitterConnect = (props: Props) => {
  const twitterLogo = FaTwitter({ color: '#007aff' });
  const twitterLogoHref = 'https://twitter.com/flowdotso';

  switch (props.state.step) {
    case Twitter.Connect: {
      const step = {
        title: 'Connect Twitter',
        message: 'Connect',
        href: props.state.data.url,
        isComplete: false
      };

      return (
        <ThirdPartyConnection connectionName="Twitter" logoHref={twitterLogoHref} logo={twitterLogo} step={step} />
      );
    }
    case Twitter.Follow: {
      const step = {
        title: 'Follow us on Twitter',
        message: 'Follow',
        href: props.state.data.url,
        isComplete: false
      };

      return (
        <ThirdPartyConnection connectionName="Twitter" logoHref={twitterLogoHref} logo={twitterLogo} step={step} />
      );
    }
    case Twitter.Complete: {
      const step = {
        title: 'Follow us on Twitter',
        message: 'Follow',
        href: '',
        isComplete: true
      };

      return (
        <ThirdPartyConnection connectionName="Twitter" logoHref={twitterLogoHref} logo={twitterLogo} step={step} />
      );
    }
  }
};