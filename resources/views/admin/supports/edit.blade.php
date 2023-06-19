
<h1>Duvida {{$support->protocolo}}</h1>

<form action="{{ route('supports.update', $support->id)}}" method="post">
    {{-- <input type="text" value="{{ csrf_token() }}" name="_token"> --}}
    @csrf
    @method('PUT')
    <textarea placeholder="Detalhes" name="detalhes_suporte">{{$support->detalhes_suporte}}</textarea>
    <select name="status" class="form-control" value='{{$support->status}}'>
        <option value="a">Ativo</option>
        <option value="p">Pendente</option>
        <option value="c">Concluido</option>
    </select>
    <button type="submit">Enviar</button>
</form>