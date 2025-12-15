import { AlertDialog, AlertDialogTrigger } from '@/components/ui/AlertDialog';
import { Button } from '@/components/ui/Button';

export const StudyRemoveDialog = () => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">스터디 삭제</Button>
      </AlertDialogTrigger>
    </AlertDialog>
  );
};
