
import { useState, useEffect, FormEventHandler } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        last_name:'',
        email: '',
        password: '',
        password_confirmation: '',
        cpf: '',
        phone: '',
        cep: '',
        birth: '',
    });
    

    function formatarCEP(event: React.FormEvent<HTMLInputElement> ) {
        
        const input = event.currentTarget;
        let cep = input.value.replace(/\D/g, '');
    
        if (cep.length === 8) {
        cep = cep.replace(/(\d{5})(\d{3})/, '$1-$2');
        }
    
        input.value = cep;
    }

    function formatarCPF(event: React.FormEvent<HTMLInputElement>) {
        const input = event.currentTarget;
        let cpf = input.value.replace(/\D/g, '');
    
        if (cpf.length === 11) {
        cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
        }
        input.value = cpf;
    }

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);


    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register'));
    
    };

    const hasBirthError = errors.hasOwnProperty('birth');

    return (
        <GuestLayout>
            <Head title="Registro" />

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="name" value="Nome" />

                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />

                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="last_name" value="Sobrenome" />

                    <TextInput
                        id="last_name"
                        name="last_name"
                        value={data.last_name}
                        className="mt-1 block w-full"
                        autoComplete="last_name"
                        isFocused={true}
                        onChange={(e) => setData('last_name', e.target.value)}
                        required
                    />

                    <InputError message={errors.last_name} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="cpf" value="CPF" />

                    <TextInput
                        id="cpf"
                        name="cpf"
                        value={data.cpf}
                        pattern="\d{3}\.\d{3}\.\d{3}-\d{2}"
                        onInput={formatarCPF}
                        maxLength={14}
                        className="mt-1 block w-full"
                        autoComplete="cpf"
                        onChange={(e) => setData('cpf', e.target.value)}
                        required
                    />

                    <InputError message={errors.cpf} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="phone" value="Telefone" />

                    <TextInput
                        id="phone"
                        name="phone"
                        value={data.phone}
                        className="mt-1 block w-full"
                        autoComplete="telefone"
                        onChange={(e) => setData('phone', e.target.value)}
                        required
                    />

                    <InputError message={errors.phone} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="cep" value="CEP" />

                    <TextInput
                        id="cep"
                        type='text'
                        pattern="\d{5}-\d{3}"
                        name="cep"
                        value={data.cep}
                        className="mt-1 block w-full"
                        autoComplete="CEP"
                        maxLength={8}
                        onInput={formatarCEP}
                        onChange={(e) => setData('cep', e.target.value)}
                        required
                    />

                    <InputError message={errors.cep} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="birth" value="Data de Nascimento" />

                    <TextInput
                        id="birth"
                        type="date"
                        name="birth"
                        value={data.birth}
                        className="mt-1 block w-full"
                        autoComplete="Data de Nascimento"
                        onChange={(e) => setData('birth', e.target.value)}
                        required
                    />
                    <InputError message={errors.birth} className="mt-2" />
                </div>
                

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Senha" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password_confirmation" value="Confirma Senha" />

                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        required
                    />

                    <InputError message={errors.password_confirmation} className="mt-2" />
                </div>

                <div className="flex items-center justify-end mt-4">
                    <Link
                        href={route('login')}
                        className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Esta Registrado?
                    </Link>

                    <PrimaryButton className="ml-4" disabled={processing}>
                        Registro
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
