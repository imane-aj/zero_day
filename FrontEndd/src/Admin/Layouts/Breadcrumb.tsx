import { Link } from 'react-router-dom';
interface BreadcrumbProps {
  pageName: string;
}
const Breadcrumb = ({ pageName }: BreadcrumbProps) => {
  return (

      <nav className={`mb-5 w-[fit-content]`}>
        <ol className="flex items-center gap-2 bg-blite px-6 pb-2 pt-2.5 rounded hover:text-white font-medium ">
          <li>
            {pageName == 'demande de service' && <Link to="/admin/demande_service/" className='text-blue font-bold hover:text-green'>Liste des demande /</Link>}
            {pageName == 'demande de voyage long durée' && <Link to="/admin/demande_voyage_long" className='text-blue font-bold hover:text-green'>Liste des demande /</Link>}
          </li>
          <li className="text-blue">{pageName}</li>
        </ol>
      </nav>
  );
};

export default Breadcrumb;
