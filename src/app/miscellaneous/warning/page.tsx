import Image from 'next/image';

const DeerWarningPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <Image 
        src="/images/work-in-progress.png" 
        alt="Deer says: You shouldn't be here yet!" 
        width={500}
        height={500}
      />
    </div>
  );
};

export default DeerWarningPage;
