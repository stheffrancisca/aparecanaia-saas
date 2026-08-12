const handleSearch = async (e) => {
  e.preventDefault();
  if (!domain.trim()) return;

  setIsSearching(true);
  try {
    const res = await fetch('/api/geo-score', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: domain.trim() })  // ← muda 'domain' para 'url'
    });
    const data = await res.json();
    
    if (data.success && data.result) {
      setSearchResults(data.result);  // ← desempacota
      setShowResults(true);
      setDomain('');
    } else {
      alert(data.error || 'Erro ao buscar');
    }
  } catch (error) {
    console.error('Erro na busca:', error);
    alert('Erro ao buscar. Tente novamente.');
  } finally {
    setIsSearching(false);
  }
};
