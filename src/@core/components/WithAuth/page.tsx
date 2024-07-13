// components/withAuth.tsx
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated } from '@/lib/auth/auth';

const withAuth = (WrappedComponent: React.ComponentType) => {
    return (props: any) => {
        const router = useRouter();

        useEffect(() => {
            if (!isAuthenticated()) {
                router.replace('/admin2357/login'); // Redirect to login if not authenticated
            }
        }, []);

        return isAuthenticated() ? <WrappedComponent {...props} /> : null;
    };
};

export default withAuth;