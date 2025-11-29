import { Avatar, AvatarImage } from '@/components/ui/Avatar';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';

type Props = {
  user: {
    name: string;
    email: string;
    image: string;
  };
  provider: string;
  accessToken: string;
};

export const TestAuthCard = ({ user, provider, accessToken }: Props) => {
  return (
    <Card className="w-full gap-0">
      <CardHeader>
        <div className="flex flex-row gap-4">
          <Avatar>
            <AvatarImage src={user.image} alt={user.name} />
          </Avatar>
          <div className="flex flex-col">
            <CardTitle>{user.name}</CardTitle>
            <CardDescription>{user.email}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <span className="text-xs">{provider} 액세스 토큰:</span>
        <div className="bg-muted rounded-sm px-4 py-2">
          <span className="font-mono text-xs">{accessToken}</span>
        </div>
      </CardContent>
    </Card>
  );
};
