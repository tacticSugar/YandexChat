import { Link } from '../../components/link';
import { ProfileAvatar, ProfileAvatarProps } from '../../components/profileAvatar';
import { ProfileContent } from '../../components/profileContent';
import { ProfileControl } from '../../components/profileControl';
import { withStore } from '../../store/WithStore';
import Block from '../../utils/Block';
import template from './profile.pug';

interface ProfileBaseProps {
  display_name: string,
}

class ProfileBase extends Block<ProfileBaseProps> {
  constructor(props: ProfileBaseProps) {
    super('section', props);
    this.element?.classList.add('profile');
  }

  init() {
    this.children.back_button = new Link({
      className: 'backButton',
      url: '/messenger',
    });
    this.children.profile_avatar = new ProfileAvatar({
      name: this.props.display_name,
    } as ProfileAvatarProps);
    this.children.profile_content = new ProfileContent({});
    this.children.profile_control = new ProfileControl();
  }

  render() {
    return this.compile(template, this.props);
  }
}

const withUser = withStore((state) => ({ display_name: state.user.display_name }));

export const Profile = withUser(ProfileBase);
