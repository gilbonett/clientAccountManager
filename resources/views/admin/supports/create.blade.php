<h1>Novo Suporte</h1>

<form action="{{ route('supports.store')}}" method="post">
    {{-- <input type="text" value="{{ csrf_token() }}" name="_token"> --}}
    @csrf
    <input type="text" placeholder="Protocolo" name="protocolo">
    <input type="text" placeholder="CPF" name="cpf">
    <select name="canal" class="form-control">
        <option value="email">E-mail</option>
        <option value="loja">Loja</option>
        <option value="whatsapp">WhatsApp</option>
        <option value="site">Site</option>
    </select>
    <input type="text" placeholder="Tipo" name="tipo_de_suporte">
    <input type="textarea" placeholder="Detalhes" name="detalhes_suporte">
    <select name="status" class="form-control">
        <option value="a">Ativo</option>
        <option value="p">Pendente</option>
        <option value="c">Concluido</option>
    </select>
    <input type="date" name="data">
    <button type="submit">Enviar</button>
</form>