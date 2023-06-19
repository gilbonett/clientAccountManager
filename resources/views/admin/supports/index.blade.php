<h1> Listagem dos Suportes</h1>

<a href="{{ route('supports.create') }}">Criar Suporte</a>
<table>
    <thead>
        <th>Protocolo</th>
        <th>Cliente-CPF</th>
        <th>Canal</th>
        <th>Tipo</th>
        <th>Detalhes</th>
        <th>Data</th>
        <th>Status</th>
    </thead>
    <tbody>
        @foreach ($supports as $support)
        <tr>
            <td>{{$support->protocolo}}</td>
            <td>{{$support->cpf}}</td>
            <td>{{$support->canal}}</td>
            <td>{{$support->tipo_de_suporte}}</td>
            <td>{{$support->detalhes_suporte}}</td>
            <td>{{$support->data}}</td>
            <td>{{$support->status}}</td>
            <td>
                <a href="{{route('supports.show', $support->id) }}">Ir</a>
                <a href="{{route('supports.edit', $support->id) }}">Editar</a>
            </td>
        </tr>
        @endforeach
    </tbody>
</table>

