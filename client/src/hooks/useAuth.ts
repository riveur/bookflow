import { getCurrentUserInformations } from "@/lib/client"
import { useTokenStore } from "@/stores/useTokenStore"
import { useQuery } from "react-query"
import { useLocation, useNavigate } from "react-router-dom";

export const useAuth = () => {
  const resetTokenStore = useTokenStore(state => state.reset);
  const navigate = useNavigate();
  const location = useLocation();

  return useQuery({
    queryKey: 'auth',
    queryFn: getCurrentUserInformations,
    retry: 1,
    onError: () => {
      resetTokenStore();
      navigate('/login', { replace: true, state: { from: location } });
    }
  })
}