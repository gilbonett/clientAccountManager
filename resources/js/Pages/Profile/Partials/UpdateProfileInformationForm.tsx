import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import { FormEventHandler } from 'react';
import { PageProps } from '@/types';

export default function UpdateProfileInformation({ mustVerifyEmail, status, className = '' }: { mustVerifyEmail: boolean, status?: string, className?: string }) {
    const user = usePage<PageProps>().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        name: user.name,
        last_name: user.last_name,
        email: user.email,
        cpf: user.cpf,
        phone: user.phone,
        cep: user.cep,
        birth: user.birth,
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

    const hasBirthError = errors.hasOwnProperty('birth');

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        patch(route('profile.update'));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">Informação do Perfil</h2>

                <p className="mt-1 text-sm text-gray-600">
                Atualize as informações de perfil 
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
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

                <div>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="username"
                    />

                    <InputError className="mt-2" message={errors.email} />
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="text-sm mt-2 text-gray-800">
                            Your email address is unverified.
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="mt-2 font-medium text-sm text-green-600">
                                A new verification link has been sent to your email address.
                            </div>
                        )}
                    </div>
                )}

                

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Salvar</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enterFrom="opacity-0"
                        leaveTo="opacity-0"
                        className="transition ease-in-out"
                    >
                        <p className="text-sm text-gray-600">Saved.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
