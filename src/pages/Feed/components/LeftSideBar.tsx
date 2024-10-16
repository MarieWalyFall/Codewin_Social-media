import { StyledLeftSideBar } from '../style/StyledLeftSideBar';
import { CommunityPanel } from './CommunityPanel';
import { FeedIdentityModule } from './FeedIdentityModule/FeedIdentityModule';

export function LeftSideBar() {
  return (
    <StyledLeftSideBar className="left-side-bar">
      <FeedIdentityModule />
      <CommunityPanel />
    </StyledLeftSideBar>
  );
}
