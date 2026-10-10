import * as React from "react"
import Head from "next/head"
import Link from "next/link"
import {
  ArrowLeft,
  Mail,
  Lock,
  Search,
  Sparkles,
  Home,
  Book,
  Star,
  Users,
} from "lucide-react"
import {
  Button,
  Input,
  Textarea,
  Badge,
  Card,
  CardContent,
  Select,
  Switch,
  Checkbox,
  RadioGroup,
  RadioGroupItem,
  Slider,
  DatePicker,
  Tabs,
  Pagination,
  Breadcrumb,
  Steps,
  Avatar,
  AvatarGroup,
  Heading,
  Text,
  SectionHeader,
  SparkleStar,
  UserIcon,
  BibleIcon,
  LookUpIcon,
  LookDownIcon,
  QuestionIcon,
  InsightIcon,
  ApplyIcon,
  SearchIcon,
  CopyIcon,
  CheckIcon,
  ShareIcon,
  BookmarkIcon,
  SunIcon,
  MoonIcon,
  LockIcon,
  BellIcon,
  BoltIcon,
  ShieldIcon,
  DiamondIcon,
} from "@/components/ui"

export default function DesignSystemPage() {
  const [selectValue, setSelectValue] = React.useState("option1")
  const [switchOn, setSwitchOn] = React.useState(true)
  const [checkboxChecked, setCheckboxChecked] = React.useState(true)
  const [radioValue, setRadioValue] = React.useState("option1")
  const [sliderValue, setSliderValue] = React.useState(60)
  const [selectedDate, setSelectedDate] = React.useState(new Date())

  const [activeTabPrimary, setActiveTabPrimary] = React.useState("tab1")
  const [activeTabSecondary, setActiveTabSecondary] = React.useState("tab1")
  const [currentPage, setCurrentPage] = React.useState(2)

  const selectOptions = [
    { value: "option1", label: "Opção 1 (Gênesis)" },
    { value: "option2", label: "Opção 2 (Êxodo)" },
    { value: "option3", label: "Opção 3 (Levítico)" },
    { value: "option4", label: "Opção 4 (Mateus)" },
  ]

  const tabItemsPrimary = [
    { value: "tab1", label: "Início", icon: Home },
    { value: "tab2", label: "Estudos", icon: Book },
    { value: "tab3", label: "Favoritos", icon: Star },
    { value: "tab4", label: "Desabilitado", disabled: true },
  ]

  const tabItemsSecondary = [
    { value: "tab1", label: "Visão Geral", icon: Home },
    { value: "tab2", label: "Comentários", icon: Users },
    { value: "tab3", label: "Notas", icon: Star },
  ]

  const breadcrumbItems = [
    { label: "Início", href: "/" },
    { label: "Antigo Testamento", href: "#" },
    { label: "Gênesis", href: "#" },
    { label: "Capítulo 1" },
  ]

  const stepList = [
    { label: "Passo 1", description: "Concluído" },
    { label: "Passo 2", description: "Em andamento" },
    { label: "Passo 3", description: "Pendente" },
    { label: "Passo 4", description: "Pendente" },
  ]

  const avatarUsers = [
    {
      name: "Nolan Carder",
      initials: "NC",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
    },
    {
      name: "Lydia Baptista",
      initials: "LB",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    },
    {
      name: "Gretchen Siphron",
      initials: "GS",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    },
    {
      name: "Arthur Dent",
      initials: "AD",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    },
    { name: "Beatriz Lima", initials: "BL" },
    { name: "Carlos Eduardo", initials: "CE" },
  ]

  return (
    <>
      <Head>
        <title>Design System | Estudo Bíblico</title>
      </Head>

      <div className="min-h-screen bg-[#FAFAFB] text-[#162235] px-4 py-12">
        <div className="max-w-5xl mx-auto flex flex-col gap-12">
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-[#E7E9EA]">
            <div>
              <Link href="/">
                <Button
                  variant="outline"
                  size="sm"
                  leftIcon={ArrowLeft}
                  className="mb-3 text-xs"
                >
                  Voltar
                </Button>
              </Link>
              <Heading level={2}>Design System Showcase</Heading>
              <Text variant="body4" color="subtle" className="mt-1">
                Conjunto de componentes atômicos, tipografia padronizada e
                tokens visuais.
              </Text>
            </div>
            <Badge variant="blue" size="lg" dot>
              v1.0.0
            </Badge>
          </div>

          {/* Typography Scale Section */}
          <section className="flex flex-col gap-4">
            <SectionHeader title="1. Tipografia Padronizada (Heading & Text)" />
            <Card>
              <CardContent className="flex flex-col gap-5">
                <div className="flex flex-col gap-2 pb-4 border-b border-[#F4F5F6]">
                  <Heading level={1}>Heading 1 (84px / 96px ExtraBold)</Heading>
                  <Heading level={2}>Heading 2 (64px / 76px Bold)</Heading>
                  <Heading level={3}>Heading 3 (48px / 60px Bold)</Heading>
                  <Heading level={4}>Heading 4 (40px / 52px Semi Bold)</Heading>
                  <Heading level={5}>Heading 5 (32px / 44px Semi Bold)</Heading>
                  <Heading level={6}>Heading 6 (24px / 36px Semi Bold)</Heading>
                </div>

                <div className="flex flex-col gap-2">
                  <Text variant="body1">Body 1 (20px / 30px Medium) — Texto de destaque</Text>
                  <Text variant="body2">Body 2 (18px / 28px Medium) — Subtítulos e ênfase</Text>
                  <Text variant="body3">Body 3 (16px / 26px Regular) — Leitura principal</Text>
                  <Text variant="body4">Body 4 (14px / 24px Regular) — Texto de interface padrão</Text>
                  <Text variant="body5" color="subtle">Body 5 (12px / 22px Regular) — Legendas e metadados</Text>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Color Palette Section */}
          <section className="flex flex-col gap-4">
            <SectionHeader title="2. Cores Primárias & Secundárias" />
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-3">
              <div className="flex flex-col gap-1.5 p-3 rounded-xl bg-white border border-[#E7E9EA]">
                <div className="h-12 rounded-lg bg-[#3266F1]" />
                <span className="text-xs font-semibold">Primary Blue</span>
                <span className="text-[10px] text-[#7B878E]">#3266F1</span>
              </div>
              <div className="flex flex-col gap-1.5 p-3 rounded-xl bg-white border border-[#E7E9EA]">
                <div className="h-12 rounded-lg bg-[#161B2C]" />
                <span className="text-xs font-semibold">Navy Neutral</span>
                <span className="text-[10px] text-[#7B878E]">#161B2C</span>
              </div>
              <div className="flex flex-col gap-1.5 p-3 rounded-xl bg-white border border-[#E7E9EA]">
                <div className="h-12 rounded-lg bg-[#205F70]" />
                <span className="text-xs font-semibold">Teal</span>
                <span className="text-[10px] text-[#7B878E]">#205F70</span>
              </div>
              <div className="flex flex-col gap-1.5 p-3 rounded-xl bg-white border border-[#E7E9EA]">
                <div className="h-12 rounded-lg bg-[#47A46A]" />
                <span className="text-xs font-semibold">Green</span>
                <span className="text-[10px] text-[#7B878E]">#47A46A</span>
              </div>
              <div className="flex flex-col gap-1.5 p-3 rounded-xl bg-white border border-[#E7E9EA]">
                <div className="h-12 rounded-lg bg-[#6D5EDB]" />
                <span className="text-xs font-semibold">Purple</span>
                <span className="text-[10px] text-[#7B878E]">#6D5EDB</span>
              </div>
              <div className="flex flex-col gap-1.5 p-3 rounded-xl bg-white border border-[#E7E9EA]">
                <div className="h-12 rounded-lg bg-[#E55082]" />
                <span className="text-xs font-semibold">Pink</span>
                <span className="text-[10px] text-[#7B878E]">#E55082</span>
              </div>
              <div className="flex flex-col gap-1.5 p-3 rounded-xl bg-white border border-[#E7E9EA]">
                <div className="h-12 rounded-lg bg-[#E05E4D]" />
                <span className="text-xs font-semibold">Red</span>
                <span className="text-[10px] text-[#7B878E]">#E05E4D</span>
              </div>
              <div className="flex flex-col gap-1.5 p-3 rounded-xl bg-white border border-[#E7E9EA]">
                <div className="h-12 rounded-lg bg-[#ED7B37]" />
                <span className="text-xs font-semibold">Orange</span>
                <span className="text-[10px] text-[#7B878E]">#ED7B37</span>
              </div>
            </div>
          </section>

          {/* Buttons Section */}
          <section className="flex flex-col gap-4">
            <SectionHeader title="3. Botões (Buttons)" />
            <Card>
              <CardContent className="flex flex-col gap-6">
                <div className="flex flex-wrap items-center gap-3">
                  <Button variant="primary">Primary</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="navy">Navy</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="danger">Danger</Button>
                  <Button variant="success">Success</Button>
                  <Button disabled>Disabled</Button>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-[#F4F5F6]">
                  <Button size="sm" variant="primary">
                    Small (36px)
                  </Button>
                  <Button size="md" variant="primary">
                    Medium (48px)
                  </Button>
                  <Button size="lg" variant="primary">
                    Large (56px)
                  </Button>
                  <Button
                    variant="primary"
                    leftIcon={Sparkles}
                    rightIcon={ArrowLeft}
                  >
                    With Icons
                  </Button>
                  <Button variant="primary" isLoading>
                    Loading
                  </Button>
                </div>
          {/* Icons System Section */}
          <section className="flex flex-col gap-4">
            <SectionHeader title="4. Família de Ícones (Grid 24x24 • Traço 1.5px • Outline & Filled)" />
            <Card>
              <CardContent className="flex flex-col gap-8">
                {/* Intro Spec Box */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 bg-[#FAFAFB] rounded-xl border border-[#E7E9EA]">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-white border border-[#E7E9EA] flex items-center justify-center text-[#162235] shadow-xs">
                      <SparkleStar size={24} variant="filled" />
                    </div>
                    <div>
                      <Heading level={6}>Especificações de Ícones</Heading>
                      <Text variant="body5" color="muted">
                        Grid 24x24 px • Traço de 1.5px centralizado • Cantos suaves • Variantes Outline e Filled
                      </Text>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="blue">Line stroke: 1.5px</Badge>
                    <Badge variant="neutral">24x24 px</Badge>
                  </div>
                </div>

                {/* Outline vs Filled Comparison Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Outline Box */}
                  <div className="flex flex-col gap-3 p-5 bg-white border border-[#E7E9EA] rounded-xl">
                    <div className="flex items-center justify-between pb-3 border-b border-[#E7E9EA]">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#162235]">
                        Outline (1.5px Traço)
                      </span>
                      <span className="text-[11px] text-[#7B878E]">Foco & Legibilidade</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-[#162235] pt-2">
                      <UserIcon size={24} title="User" />
                      <BibleIcon size={24} title="Bible / Book" />
                      <LookUpIcon size={24} title="Olhe para cima" />
                      <LookDownIcon size={24} title="Olhe para baixo" />
                      <QuestionIcon size={24} title="Dúvidas" />
                      <InsightIcon size={24} title="Insights" />
                      <ApplyIcon size={24} title="Aplicação" />
                      <SearchIcon size={24} title="Search" />
                      <CopyIcon size={24} title="Copy" />
                      <CheckIcon size={24} title="Check" />
                      <ShareIcon size={24} title="Share" />
                      <BookmarkIcon size={24} title="Bookmark" />
                      <SunIcon size={24} title="Sun" />
                      <MoonIcon size={24} title="Moon" />
                      <LockIcon size={24} title="Lock" />
                      <BellIcon size={24} title="Bell" />
                      <BoltIcon size={24} title="Bolt" />
                      <ShieldIcon size={24} title="Shield" />
                      <DiamondIcon size={24} title="Diamond" />
                    </div>
                  </div>

                  {/* Filled Box */}
                  <div className="flex flex-col gap-3 p-5 bg-white border border-[#E7E9EA] rounded-xl">
                    <div className="flex items-center justify-between pb-3 border-b border-[#E7E9EA]">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#162235]">
                        Filled (Preenchido / Sólido)
                      </span>
                      <span className="text-[11px] text-[#7B878E]">Destaque & Selecionado</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-[#162235] pt-2">
                      <UserIcon size={24} variant="filled" title="User Filled" />
                      <BibleIcon size={24} variant="filled" title="Bible Filled" />
                      <LookUpIcon size={24} variant="filled" title="Olhe para cima Filled" />
                      <LookDownIcon size={24} variant="filled" title="Olhe para baixo Filled" />
                      <QuestionIcon size={24} variant="filled" title="Dúvidas Filled" />
                      <InsightIcon size={24} variant="filled" title="Insights Filled" />
                      <ApplyIcon size={24} variant="filled" title="Aplicação Filled" />
                      <SearchIcon size={24} variant="filled" title="Search Filled" />
                      <CopyIcon size={24} variant="filled" title="Copy Filled" />
                      <CheckIcon size={24} variant="filled" title="Check Filled" />
                      <ShareIcon size={24} variant="filled" title="Share Filled" />
                      <BookmarkIcon size={24} variant="filled" title="Bookmark Filled" />
                      <SunIcon size={24} variant="filled" title="Sun Filled" />
                      <MoonIcon size={24} variant="filled" title="Moon Filled" />
                      <LockIcon size={24} variant="filled" title="Lock Filled" />
                      <BellIcon size={24} variant="filled" title="Bell Filled" />
                      <BoltIcon size={24} variant="filled" title="Bolt Filled" />
                      <ShieldIcon size={24} variant="filled" title="Shield Filled" />
                      <DiamondIcon size={24} variant="filled" title="Diamond Filled" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Selections Section */}
          <section className="flex flex-col gap-4">
            <SectionHeader title="4. Seleções (Selections)" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Toggle Switch */}
              <Card>
                <CardContent className="flex flex-col gap-4">
                  <Text variant="body4" color="default" className="font-bold">
                    Toggle Switch
                  </Text>
                  <div className="flex flex-col gap-3">
                    <Switch
                      label={switchOn ? "On" : "Off"}
                      checked={switchOn}
                      onChange={setSwitchOn}
                    />
                    <Switch label="Off" checked={false} />
                    <Switch label="Disabled On" checked={true} disabled />
                    <Switch label="Disabled Off" checked={false} disabled />
                  </div>
                </CardContent>
              </Card>

              {/* Checkbox */}
              <Card>
                <CardContent className="flex flex-col gap-4">
                  <Text variant="body4" color="default" className="font-bold">
                    Checkbox
                  </Text>
                  <div className="flex flex-col gap-3">
                    <Checkbox
                      label="Checked"
                      checked={checkboxChecked}
                      onChange={setCheckboxChecked}
                    />
                    <Checkbox label="Unchecked" checked={false} />
                    <Checkbox
                      label="Disabled Checked"
                      checked={true}
                      disabled
                    />
                    <Checkbox
                      label="Disabled Unchecked"
                      checked={false}
                      disabled
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Radio Buttons */}
              <Card>
                <CardContent className="flex flex-col gap-4">
                  <Text variant="body4" color="default" className="font-bold">
                    Radio Buttons
                  </Text>
                  <RadioGroup value={radioValue} onChange={setRadioValue}>
                    <RadioGroupItem value="option1" label="Selected" />
                    <RadioGroupItem value="option2" label="Unselected" />
                    <RadioGroupItem
                      value="option3"
                      label="Disabled Unselected"
                      disabled
                    />
                  </RadioGroup>
                </CardContent>
              </Card>

              {/* Slider */}
              <Card className="md:col-span-2">
                <CardContent className="flex flex-col gap-4">
                  <Text variant="body4" color="default" className="font-bold">
                    Sliders
                  </Text>
                  <Slider
                    label="Single Slider (Volume / Progresso)"
                    value={sliderValue}
                    onChange={setSliderValue}
                  />
                  <Slider label="Disabled Slider" value={40} disabled />
                </CardContent>
              </Card>

              {/* Date Picker */}
              <Card>
                <CardContent className="flex flex-col gap-4">
                  <Text variant="body4" color="default" className="font-bold">
                    Date Picker
                  </Text>
                  <DatePicker
                    label="Selecionar Data"
                    value={selectedDate}
                    onChange={setSelectedDate}
                  />
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Navigations Section */}
          <section className="flex flex-col gap-4">
            <SectionHeader title="5. Navegações (Navigations)" />
            <Card>
              <CardContent className="flex flex-col gap-8">
                {/* Tab Bar Primary */}
                <div className="flex flex-col gap-3">
                  <Text
                    variant="body5"
                    color="subtle"
                    className="font-semibold uppercase tracking-wider"
                  >
                    Tab Bar (Primary Pill)
                  </Text>
                  <Tabs
                    items={tabItemsPrimary}
                    value={activeTabPrimary}
                    onChange={setActiveTabPrimary}
                    variant="primary"
                  />
                </div>

                {/* Tab Bar Secondary */}
                <div className="flex flex-col gap-3">
                  <Text
                    variant="body5"
                    color="subtle"
                    className="font-semibold uppercase tracking-wider"
                  >
                    Tab Bar (Secondary Underline)
                  </Text>
                  <Tabs
                    items={tabItemsSecondary}
                    value={activeTabSecondary}
                    onChange={setActiveTabSecondary}
                    variant="secondary"
                  />
                </div>

                {/* Breadcrumb & Pagination */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[#F4F5F6]">
                  <div className="flex flex-col gap-3">
                    <Text
                      variant="body5"
                      color="subtle"
                      className="font-semibold uppercase tracking-wider"
                    >
                      Breadcrumb
                    </Text>
                    <Breadcrumb items={breadcrumbItems} />
                  </div>

                  <div className="flex flex-col gap-3">
                    <Text
                      variant="body5"
                      color="subtle"
                      className="font-semibold uppercase tracking-wider"
                    >
                      Pagination
                    </Text>
                    <Pagination
                      currentPage={currentPage}
                      totalPages={17}
                      onPageChange={setCurrentPage}
                    />
                  </div>
                </div>

                {/* Steps / Stepper */}
                <div className="flex flex-col gap-3 pt-4 border-t border-[#F4F5F6]">
                  <Text
                    variant="body5"
                    color="subtle"
                    className="font-semibold uppercase tracking-wider"
                  >
                    Steps / Stepper
                  </Text>
                  <div className="py-2">
                    <Steps steps={stepList} currentStep={2} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Avatars Section */}
          <section className="flex flex-col gap-4">
            <SectionHeader title="6. Avatares (Avatars)" />
            <Card>
              <CardContent className="flex flex-col gap-8">
                {/* Sizes */}
                <div className="flex flex-col gap-3">
                  <Text
                    variant="body5"
                    color="subtle"
                    className="font-semibold uppercase tracking-wider"
                  >
                    Tamanhos (Small 24px, Medium 40px, Large 54px, ExtraLarge 64px)
                  </Text>
                  <div className="flex items-center gap-6">
                    <div className="flex flex-col items-center gap-1">
                      <Avatar initials="SA" size="sm" />
                      <Text variant="body5" color="subtle">24px</Text>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <Avatar initials="SA" size="md" />
                      <Text variant="body5" color="subtle">40px</Text>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <Avatar initials="SA" size="lg" />
                      <Text variant="body5" color="subtle">54px</Text>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <Avatar initials="SA" size="xl" />
                      <Text variant="body5" color="subtle">64px</Text>
                    </div>
                  </div>
                </div>

                {/* Status and Group */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-[#F4F5F6]">
                  <div className="flex flex-col gap-3">
                    <Text
                      variant="body5"
                      color="subtle"
                      className="font-semibold uppercase tracking-wider"
                    >
                      Online & Offline
                    </Text>
                    <div className="flex items-center gap-4">
                      <Avatar
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop"
                        status="online"
                        size="lg"
                      />
                      <Avatar
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
                        status="offline"
                        size="lg"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2 flex flex-col gap-3">
                    <Text
                      variant="body5"
                      color="subtle"
                      className="font-semibold uppercase tracking-wider"
                    >
                      Avatar Group com Overflow List (Clique no +2)
                    </Text>
                    <div>
                      <AvatarGroup users={avatarUsers} max={4} size="md" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Text Fields & Inputs */}
          <section className="flex flex-col gap-4">
            <SectionHeader title="7. Campos de Texto & Formulários" />
            <Card>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Input Padrão"
                  placeholder="Digite seu nome completo"
                  helperText="Texto auxiliar de orientação."
                />

                <Input
                  label="Com Ícone à Esquerda"
                  placeholder="email@exemplo.com"
                  leftIcon={Mail}
                />

                <Input
                  label="Com Status de Sucesso"
                  defaultValue="usuario_valido"
                  status="success"
                  helperText="Nome de usuário disponível!"
                />

                <Input
                  label="Com Status de Erro"
                  defaultValue="senha123"
                  type="password"
                  leftIcon={Lock}
                  errorMessage="A senha deve ter pelo menos 8 caracteres."
                />

                <Input
                  label="Com Botão de Ação Embutido"
                  placeholder="Buscar texto ou passagem..."
                  leftIcon={Search}
                  actionButton={
                    <Button size="sm" variant="primary">
                      Buscar
                    </Button>
                  }
                />

                <Input
                  label="Desabilitado (Disabled)"
                  placeholder="Não editável"
                  disabled
                  defaultValue="Campo bloqueado"
                />

                <div className="md:col-span-2">
                  <Select
                    label="Dropdown / Select"
                    options={selectOptions}
                    value={selectValue}
                    onChange={setSelectValue}
                  />
                </div>

                <div className="md:col-span-2">
                  <Textarea
                    label="Área de Texto (Textarea)"
                    placeholder="Digite anotações ou comentários do estudo..."
                    helperText="Máximo de 500 caracteres."
                  />
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </>
  )
}
