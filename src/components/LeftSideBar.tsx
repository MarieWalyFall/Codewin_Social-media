import { CommunityPanel } from './CommunityPanel';
import { FeedIdentityModule } from './FeedIdentityModule/FeedIdentityModule';

export function LeftSideBar() {
  return (
    <section className="left-side-bar">
      <FeedIdentityModule />
      <CommunityPanel />
    </section>
  );
}
