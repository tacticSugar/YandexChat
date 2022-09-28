import { Block } from '../../utils/core/Block';
import { computeAvatarAttributes } from './avatar-helpers';
import { AvatarProps } from './avatar-types';
import { avatarTemplate } from './avatar.template';
import './avatar.scss';

export class Avatar extends Block<AvatarProps> {
  constructor(props: AvatarProps) {
    super('div', props);
  }

  render() {
    const { imgSrc, name, inProfile } = this.props;
    const avatarAttributes = computeAvatarAttributes({ inProfile, imgSrc });
    return this.compile(avatarTemplate, {
      name,
      avatarAttributes,
      inProfile,
    });
  }
}
