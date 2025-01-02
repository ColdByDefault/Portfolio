import Breadcrumb from '@components/ui/breadcrumb';

import LibraryComponent from '@components/ui/LibraryComp';
import RightSidebarNav from '@components/ui/RightSidebarNav';


const topics = [
  { id: 1, link: '/topic-1', title: 'Topic 1' },
  { id: 2, link: '/topic-2', title: 'Topic 2' },
  { id: 3, link: '/topic-3', title: 'Topic 3' },
];


export default function Page() {
  return (
    <div>
      <Breadcrumb />
      <div className='flex'>
        <LibraryComponent />
        <RightSidebarNav topics={topics}/>
      </div>
    </div>
  );
}
