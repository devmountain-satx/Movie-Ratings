
export default function LogoutButton({ onLogout }) {
    
    return (
      <form onSubmit={onLogout}>
        <button type="submit">Sign out</button>
      </form>
    );
}