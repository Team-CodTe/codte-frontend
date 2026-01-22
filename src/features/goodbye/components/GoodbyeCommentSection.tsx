'use client';

import { Button } from '@/components/ui/Button';
import { PATH } from '@/constants/path';
import { motion } from 'motion/react';
import Link from 'next/link';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

type Props = {
  username: string;
};

export const GoodbyeCommentSection = ({ username }: Props) => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex max-w-lg flex-col items-center gap-8 text-center">
      <motion.h1
        variants={itemVariants}
        className="text-3xl leading-tight font-bold sm:text-4xl">
        <span className="text-primary font-mono">System.exit(0);</span>
        <br />
        {username ? `${username}님,` : ''} 수고하셨습니다!
      </motion.h1>

      <motion.p
        variants={itemVariants}
        className="text-muted-foreground text-base leading-relaxed sm:text-lg">
        CodTe에서의 프로세스는 종료되었지만,{' '}
        {username ? `${username}님의` : '당신의'} 코딩 라이프는 계속되길
        바랍니다. 언제든 다시 import가 필요하면 찾아주세요!
      </motion.p>

      <motion.div variants={itemVariants}>
        <Button asChild size="lg">
          <Link href={PATH.LANDING} replace>
            메인 페이지로
          </Link>
        </Button>
      </motion.div>
    </motion.div>
  );
};
