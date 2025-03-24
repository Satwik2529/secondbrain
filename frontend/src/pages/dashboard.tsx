import { useState } from 'react';
import '../App.css';
import { Button } from '../components/Button';
import { PlusIcon } from '../icons/PlusIcon';
import { Shareicon } from '../icons/Shareicon';
import { Card } from '../components/Card';
import { CreateContentModal } from '../components/Createcontentmodel';
import { Sidebar } from '../components/Sidebar';
import { useContent } from '../hooks/useContent';
import { BACKEND_URL } from '../config';
import axios from 'axios';

export function Dashboard() {
  const [modalOPen, setModalOpen] = useState(false);
  const contents = useContent();

  return (
    <div>
      <Sidebar />
      <div className="p-4 ml-72 min-h-screen bg-sky-100 border-2">
        <CreateContentModal open={modalOPen} onClose={() => setModalOpen(false)} />
        <div className="flex justify-end">
          <Button
            startIcon={<Shareicon size="md" />}
            varient="primary"
            size="lg"
            text="share brain"
            onClick={async () => {
              const response = await axios.post(
                `${BACKEND_URL}/api/v1/brain/share`,
                { share: true },
                {
                  headers: {
                    Authorization: localStorage.getItem("token"),
                  },
                }
              );
              const shareUrl = `http://localhost:5173/share/${response.data.hash}`;
              alert(shareUrl);
            }}
          />
          <Button
            startIcon={<PlusIcon size="md" />}
            varient="secondary"
            size="sm"
            text="add content"
            onClick={() => setModalOpen(true)}
          />
        </div>
        <div className="flex gap-4 flex-wrap">
          {contents.map(({ type, link, tittle }) => (
            <Card key={link} type={type} link={link} tittle={tittle} />
          ))}
        </div>
      </div>
    </div>
  );
}
