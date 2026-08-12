import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

type FormStatus = "idle" | "sending" | "success";

const benefits = [
  {
    number: "01",
    title: "Histórico em um só lugar",
    text: "Organize períodos, operações e observações sem depender de arquivos espalhados.",
  },
  {
    number: "02",
    title: "Evolução com contexto",
    text: "Visualize indicadores por período e entenda como uma estratégia se comporta ao longo do tempo.",
  },
  {
    number: "03",
    title: "Perfil pronto para compartilhar",
    text: "Apresente somente as informações que você escolher, em um formato claro e comparável.",
  },
  {
    number: "04",
    title: "Controle de privacidade",
    text: "Defina o que permanece privado e o que poderia ser exibido em uma futura versão do produto.",
  },
];

const steps = [
  {
    number: "01",
    title: "Entre na lista simulada",
    text: "Preencha um perfil demonstrativo e indique o mercado em que atua. Nenhuma informação é enviada.",
  },
  {
    number: "02",
    title: "Participe da validação fictícia",
    text: "O cenário pressupõe entrevistas e testes de protótipos, mas não existe seleção ou contato real.",
  },
  {
    number: "03",
    title: "Ajude a imaginar o produto",
    text: "Na simulação, o retorno dos participantes orientaria prioridades e critérios do futuro produto.",
  },
];

const faqs = [
  {
    question: "A Bull.io já está disponível?",
    answer:
      "Não. A Bull.io, a empresa e o produto apresentados aqui são fictícios. Esta página existe somente como projeto de portfólio.",
  },
  {
    question: "O cadastro garante acesso?",
    answer:
      "Não. O formulário é apenas uma demonstração de interface: não envia, armazena ou compartilha os dados preenchidos.",
  },
  {
    question: "A Bull.io executa operações ou recomenda investimentos?",
    answer:
      "Não. Não existe corretora, integração financeira, cotação em tempo real, execução de ordens ou recomendação de investimento.",
  },
  {
    question: "Meus resultados serão públicos?",
    answer:
      "Não. Nenhum perfil é criado e nenhum resultado é publicado. A ideia de controle de visibilidade pertence apenas ao conceito demonstrado.",
  },
  {
    question: "Existe domínio, e-mail ou canal de atendimento real?",
    answer:
      "Não. O projeto foi preparado para hospedagem estática no GitHub Pages e não usa domínio personalizado, e-mail ou suporte operacional.",
  },
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formStatus, setFormStatus] = useState<FormStatus>("idle");
  const [formStarted, setFormStarted] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  const [cookieVisible, setCookieVisible] = useState(
    () => !localStorage.getItem("bullio-privacy-choice"),
  );
  const [analysisPreference, setAnalysisPreference] = useState(
    () => localStorage.getItem("bullio-privacy-choice") === "optional",
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        });
      },
      { threshold: 0.14 },
    );

    document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const closeMenu = () => setMenuOpen(false);

  const savePrivacy = (choice: "necessary" | "optional") => {
    localStorage.setItem("bullio-privacy-choice", choice);
    setAnalysisPreference(choice === "optional");
    setCookieVisible(false);
    setPreferencesOpen(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const honeypot = new FormData(form).get("company_website");
    if (honeypot) return;

    setFormStatus("sending");
    window.setTimeout(() => {
      form.reset();
      setFormStatus("success");
    }, 700);
  };

  const markFormStarted = () => {
    if (!formStarted) setFormStarted(true);
  };

  return (
    <>
      <a className="skip-link" href="#conteudo">
        Ir para o conteúdo
      </a>

      <div className="simulation-bar">
        <span className="simulation-dot" aria-hidden="true" />
        Projeto 100% fictício para portfólio — produto, empresa, cadastros e integrações não são reais
      </div>

      <header className="site-header">
        <div className="container header-inner">
          <a className="brand" href="#topo" aria-label="Bull.io - início" onClick={closeMenu}>
            <img src="./bullio_logo.svg" alt="Bull.io" width="1200" height="300" />
          </a>

          <button
            className="menu-toggle"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="site-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
            <span className="sr-only">Abrir menu</span>
          </button>

          <nav id="site-navigation" className={menuOpen ? "main-nav is-open" : "main-nav"} aria-label="Principal">
            <a href="#como-funciona" onClick={closeMenu}>Como funciona</a>
            <a href="#beneficios" onClick={closeMenu}>Benefícios</a>
            <a href="#para-quem" onClick={closeMenu}>Para quem é</a>
            <a href="#faq" onClick={closeMenu}>Perguntas</a>
            <a className="button button-small" href="#cadastro" onClick={closeMenu}>Ver formulário fictício</a>
          </nav>
        </div>
      </header>

      <main id="conteudo">
        <section className="hero" id="topo">
          <div className="hero-orbit hero-orbit-one" aria-hidden="true" />
          <div className="hero-orbit hero-orbit-two" aria-hidden="true" />
          <div className="container hero-grid">
            <div className="hero-copy reveal is-visible">
              <p className="eyebrow"><span /> Validação conceitual para traders</p>
              <h1>Sua performance merece <em>mais do que prints.</em></h1>
              <p className="hero-lead">
                Imagine transformar um histórico disperso de operações em um registro organizado, comparável e pronto para compartilhar — sem planilhas espalhadas e sem promessas irreais.
              </p>
              <div className="hero-actions">
                <a className="button" href="#cadastro">Explorar a simulação</a>
                <a className="text-link" href="#proposta">Entender a proposta <span aria-hidden="true">↘</span></a>
              </div>
              <p className="hero-note">
                Demonstração gratuita de portfólio. Não há produto, lista de espera ou garantia de acesso.
              </p>
            </div>

            <div className="hero-visual reveal is-visible">
              <div className="concept-label"><span /> demonstração conceitual fictícia</div>
              <img
                src="./bullio_hero_abstrato.svg"
                alt="Painel conceitual fictício com cartões de indicadores e gráfico de evolução"
                width="1440"
                height="1080"
              />
              <div className="floating-card floating-card-top">
                <span>Contexto do registro</span>
                <strong>Histórico completo</strong>
              </div>
              <div className="floating-card floating-card-bottom">
                <span>Status deste projeto</span>
                <strong><i /> Somente portfólio</strong>
              </div>
            </div>
          </div>

          <div className="container hero-facts" aria-label="Características da demonstração">
            <div><strong>0</strong><span>integrações reais</span></div>
            <div><strong>100%</strong><span>conceitual</span></div>
            <div><strong>18+</strong><span>público do cenário</span></div>
            <p>A transparência começa pelo contexto.</p>
          </div>
        </section>

        <section className="problem section" id="proposta">
          <div className="container problem-grid">
            <div className="section-intro reveal">
              <p className="eyebrow dark"><span /> O ponto de partida</p>
              <h2>Resultados soltos não contam a história inteira.</h2>
            </div>
            <div className="problem-copy reveal">
              <p className="large-copy">
                Prints, extratos e planilhas desconectadas dificultam enxergar consistência, evolução e contexto.
              </p>
              <p>
                A Bull.io foi imaginada para reunir esses registros em uma experiência simples e transparente — incluindo períodos positivos e negativos, sem transformar dados em promessa de retorno.
              </p>
              <div className="editorial-note">
                <span>Princípio do conceito</span>
                <strong>Credibilidade nasce de um histórico que não esconde o caminho.</strong>
              </div>
            </div>
          </div>
        </section>

        <section className="showcase section section-dark" aria-labelledby="showcase-title">
          <div className="container showcase-grid">
            <div className="showcase-copy reveal">
              <p className="eyebrow"><span /> Visão do produto</p>
              <h2 id="showcase-title">Dados que ajudam a explicar uma trajetória.</h2>
              <p>
                A interface abaixo é uma ilustração, não uma plataforma funcional. Os indicadores e operações são exemplos visuais, sem conexão com mercado ou contas reais.
              </p>
              <ul className="feature-list">
                <li><span>01</span> Períodos positivos e negativos no mesmo histórico</li>
                <li><span>02</span> Registro original e contexto de atualizações</li>
                <li><span>03</span> Visibilidade escolhida pelo próprio usuário</li>
              </ul>
            </div>
            <div className="mock-dashboard reveal">
              <div className="mock-topbar">
                <div className="mock-logo">BULL<span>.</span>IO</div>
                <span className="mock-badge">dados ilustrativos</span>
              </div>
              <div className="mock-profile">
                <div className="mock-avatar">MT</div>
                <div><strong>Marina T.</strong><span>Trader cripto • perfil fictício</span></div>
                <button type="button" aria-label="Botão ilustrativo sem ação">Compartilhar</button>
              </div>
              <div className="metric-grid">
                <article><span>Resultado do período</span><strong className="positive">+8,2%</strong><small>exemplo, não promessa</small></article>
                <article><span>Taxa de acerto</span><strong>58%</strong><small>12 meses ilustrativos</small></article>
                <article><span>Drawdown</span><strong className="negative">−6,4%</strong><small>perda também importa</small></article>
              </div>
              <div className="chart-card">
                <div className="chart-heading"><div><span>Evolução acumulada</span><strong>Visão conceitual</strong></div><span>12 meses</span></div>
                <div
                  className="chart"
                  role="img"
                  aria-label="Gráfico conceitual de evolução acumulada em doze meses, com períodos de alta e de queda. Todos os dados são fictícios."
                >
                  <span className="grid-line line-one" /><span className="grid-line line-two" /><span className="grid-line line-three" />
                  <div className="chart-area" />
                  <div className="chart-line" />
                  <i className="chart-point p1" /><i className="chart-point p2" /><i className="chart-point p3" />
                </div>
                <div className="chart-months"><span>Set</span><span>Nov</span><span>Jan</span><span>Mar</span><span>Mai</span><span>Ago</span></div>
              </div>
              <p className="mock-disclaimer">DEMONSTRAÇÃO CONCEITUAL — DADOS E PERFIL FICTÍCIOS</p>
            </div>
          </div>
        </section>

        <section className="benefits section" id="beneficios">
          <div className="container">
            <div className="section-heading reveal">
              <div>
                <p className="eyebrow dark"><span /> O que a ideia propõe</p>
                <h2>Menos exposição.<br />Mais contexto.</h2>
              </div>
              <p>
                Quatro pilares para organizar e apresentar uma trajetória sem confundir transparência com promessa de resultado.
              </p>
            </div>
            <div className="benefit-grid">
              {benefits.map((benefit) => (
                <article className="benefit-card reveal" key={benefit.number}>
                  <span className="card-number">{benefit.number}</span>
                  <div className="card-mark" aria-hidden="true" />
                  <h3>{benefit.title}</h3>
                  <p>{benefit.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="process section" id="como-funciona">
          <div className="container process-grid">
            <div className="process-title reveal">
              <p className="eyebrow dark"><span /> Como funcionaria</p>
              <h2>Entre. Participe.<br />Ajude a construir.</h2>
              <p>Um fluxo simples para validar o interesse antes de qualquer desenvolvimento real.</p>
            </div>
            <div className="steps">
              {steps.map((step) => (
                <article className="step reveal" key={step.number}>
                  <span>{step.number}</span>
                  <div><h3>{step.title}</h3><p>{step.text}</p></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="audience section" id="para-quem">
          <div className="container audience-grid">
            <div className="audience-copy reveal">
              <p className="eyebrow"><span /> Para quem seria</p>
              <h2>Para quem registra cada movimento — inclusive os difíceis.</h2>
              <p>
                O cenário foi pensado para traders maiores de 18 anos que já registram operações e desejam transformar dados dispersos em uma visão organizada.
              </p>
              <div className="audience-tags"><span>Cripto</span><span>Futuros</span><span>Ações</span><span>Forex</span><span>Opções</span></div>
            </div>
            <aside className="risk-card reveal" aria-label="Limites da proposta fictícia">
              <p className="risk-kicker">Antes de continuar</p>
              <h3>Transparência também é dizer o que isto não é.</h3>
              <ul>
                <li>Não é uma corretora ou instituição financeira.</li>
                <li>Não executa operações nem integra contas.</li>
                <li>Não vende sinais ou recomenda investimentos.</li>
                <li>Não promete renda, retorno ou acesso futuro.</li>
              </ul>
              <p className="risk-footer">Toda operação financeira envolve risco.</p>
            </aside>
          </div>
        </section>

        <section className="faq section" id="faq">
          <div className="container faq-grid">
            <div className="faq-title reveal">
              <p className="eyebrow dark"><span /> Perguntas frequentes</p>
              <h2>Sem letras miúdas.</h2>
              <p>Respostas diretas sobre o estágio — e os limites — desta demonstração.</p>
            </div>
            <div className="faq-list reveal">
              {faqs.map((faq, index) => (
                <details key={faq.question} open={index === 0}>
                  <summary><span>{String(index + 1).padStart(2, "0")}</span>{faq.question}<i aria-hidden="true">+</i></summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="signup section section-dark" id="cadastro">
          <div className="container signup-grid">
            <div className="signup-copy reveal">
              <p className="eyebrow"><span /> Interação demonstrativa</p>
              <h2>Conte como você registraria seus resultados.</h2>
              <p>
                Preencha para testar a experiência do formulário. Ao enviar, a página mostra apenas uma confirmação local.
              </p>
              <div className="no-send-notice">
                <span aria-hidden="true">!</span>
                <p><strong>Nenhum dado será enviado ou armazenado.</strong> Não há API, CRM, lista de espera ou contato posterior.</p>
              </div>
            </div>

            <div className="form-card reveal">
              {formStatus === "success" ? (
                <div className="success-state" role="status" aria-live="polite">
                  <span aria-hidden="true">✓</span>
                  <p className="eyebrow dark">Simulação concluída</p>
                  <h3>A interface funcionou.</h3>
                  <p>Nenhuma informação foi enviada, salva ou compartilhada. Esta confirmação existe somente no seu navegador.</p>
                  <button className="text-button" type="button" onClick={() => setFormStatus("idle")}>Testar novamente</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} onInput={markFormStarted}>
                  <div className="form-heading">
                    <div><span>FORMULÁRIO FICTÍCIO</span><h3>Conte um pouco sobre você</h3></div>
                    <span className="form-step">01 / 01</span>
                  </div>

                  {formStarted && <p className="form-local-note" role="status">Modo demonstração: o preenchimento permanece somente nesta tela.</p>}

                  <div className="field-grid">
                    <label><span>Nome <b>*</b></span><input name="name" type="text" minLength={2} maxLength={80} required placeholder="Seu nome" autoComplete="name" /></label>
                    <label><span>E-mail <b>*</b></span><input name="email" type="email" maxLength={120} required placeholder="voce@exemplo.com" autoComplete="email" /></label>
                    <label><span>Mercado principal <b>*</b></span><select name="market" required defaultValue=""><option value="" disabled>Selecione</option><option>Cripto</option><option>Ações</option><option>Futuros</option><option>Opções</option><option>Forex</option><option>Outro</option></select></label>
                    <label><span>Tempo de experiência <b>*</b></span><select name="experience" required defaultValue=""><option value="" disabled>Selecione</option><option>Estou começando</option><option>Até 2 anos</option><option>De 2 a 5 anos</option><option>Mais de 5 anos</option></select></label>
                    <label><span>Interesse em testar <b>*</b></span><select name="tester_interest" required defaultValue=""><option value="" disabled>Selecione</option><option>Sim, em um cenário real</option><option>Talvez</option><option>Não agora</option></select></label>
                    <label><span>WhatsApp <small>opcional</small></span><input name="whatsapp" type="tel" maxLength={20} placeholder="(00) 00000-0000" autoComplete="tel" /></label>
                    <label><span>Principal rede social <small>opcional</small></span><select name="social_network" defaultValue=""><option value="">Selecione</option><option>Instagram</option><option>X</option><option>YouTube</option><option>LinkedIn</option><option>Outra</option></select></label>
                    <label><span>Faixa de audiência <small>opcional</small></span><select name="audience_range" defaultValue=""><option value="">Selecione</option><option>Ainda não tenho</option><option>Até 1 mil</option><option>1 mil a 10 mil</option><option>10 mil a 50 mil</option><option>Mais de 50 mil</option></select></label>
                    <label className="field-full"><span>Link do perfil <small>opcional</small></span><input name="profile_url" type="url" maxLength={240} placeholder="https://" /></label>
                  </div>

                  <label className="honeypot" aria-hidden="true">Site da empresa<input name="company_website" type="text" tabIndex={-1} autoComplete="off" /></label>

                  <label className="consent">
                    <input name="privacy_consent" type="checkbox" required />
                    <span>Entendo que este é um formulário fictício e concordo em simular o envio sem qualquer tratamento real dos dados. <button type="button" onClick={() => setPrivacyOpen(true)}>Ler aviso</button>.</span>
                  </label>

                  <button className="button form-submit" type="submit" disabled={formStatus === "sending"}>
                    {formStatus === "sending" ? "Simulando envio..." : "Concluir simulação"}<span aria-hidden="true">↗</span>
                  </button>
                  <p className="form-footnote">* Campos obrigatórios apenas para demonstrar a validação da interface.</p>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-main">
          <div className="footer-brand"><img src="./bullio_logo.svg" alt="Bull.io" width="1200" height="300" /><p>Uma ideia fictícia sobre histórico, contexto e reputação baseada em dados.</p></div>
          <div><strong>Navegação</strong><a href="#como-funciona">Como funciona</a><a href="#beneficios">Benefícios</a><a href="#para-quem">Para quem é</a><a href="#faq">Perguntas frequentes</a></div>
          <div><strong>Transparência</strong><button type="button" onClick={() => setPrivacyOpen(true)}>Aviso de privacidade</button><button type="button" onClick={() => setPreferencesOpen(true)}>Preferências locais</button><span>Contato não disponível</span><span>Sem domínio próprio</span></div>
        </div>
        <div className="container footer-bottom">
          <p>© 2026 Bull.io — identidade e projeto fictícios para portfólio.</p>
          <p>Não constitui recomendação de investimento. Rentabilidade passada não garante resultados futuros.</p>
        </div>
      </footer>

      {cookieVisible && (
        <aside className="cookie-banner" aria-label="Preferências locais">
          <div><span className="cookie-icon" aria-hidden="true">○</span><p><strong>Preferências desta demonstração</strong> Este site não usa analytics ou publicidade. Podemos salvar somente sua escolha local neste navegador.</p></div>
          <div className="cookie-actions"><button type="button" onClick={() => savePrivacy("necessary")}>Somente necessário</button><button type="button" onClick={() => setPreferencesOpen(true)}>Configurar</button><button className="button button-small" type="button" onClick={() => savePrivacy("optional")}>Aceitar simulação</button></div>
        </aside>
      )}

      {privacyOpen && (
        <div className="modal-backdrop" role="presentation" onMouseDown={() => setPrivacyOpen(false)}>
          <section className="modal" role="dialog" aria-modal="true" aria-labelledby="privacy-title" onMouseDown={(event) => event.stopPropagation()}>
            <button className="modal-close" type="button" onClick={() => setPrivacyOpen(false)} aria-label="Fechar">×</button>
            <p className="eyebrow dark"><span /> Aviso da demonstração</p>
            <h2 id="privacy-title">Privacidade sem dados reais.</h2>
            <p>Esta versão não possui servidor, API, CRM, analytics, publicidade, e-mail transacional ou banco de dados. Tudo que você digita no formulário permanece somente na página durante a sessão e é descartado após a confirmação.</p>
            <p>A única informação que pode ser mantida no navegador é a sua escolha sobre este próprio aviso, por meio de armazenamento local. Ela não identifica você e pode ser removida limpando os dados do site.</p>
            <div className="modal-note"><strong>Importante:</strong> empresa, controlador, produto, domínio, contatos, participantes e prazos são elementos fictícios deste portfólio.</div>
          </section>
        </div>
      )}

      {preferencesOpen && (
        <div className="modal-backdrop" role="presentation" onMouseDown={() => setPreferencesOpen(false)}>
          <section className="modal preferences-modal" role="dialog" aria-modal="true" aria-labelledby="preferences-title" onMouseDown={(event) => event.stopPropagation()}>
            <button className="modal-close" type="button" onClick={() => setPreferencesOpen(false)} aria-label="Fechar">×</button>
            <p className="eyebrow dark"><span /> Preferências locais</p>
            <h2 id="preferences-title">Você continua no controle.</h2>
            <div className="preference-row"><div><strong>Necessários</strong><p>Guarda somente a escolha deste painel no navegador.</p></div><span className="toggle is-on">Ativo</span></div>
            <label className="preference-row"><div><strong>Análise simulada</strong><p>Não carrega ferramenta alguma; serve apenas para demonstrar o controle.</p></div><input type="checkbox" checked={analysisPreference} onChange={(event) => setAnalysisPreference(event.target.checked)} /></label>
            <p className="preferences-warning">Mesmo quando ativada, nenhuma medição, cookie opcional ou transmissão de dados acontece.</p>
            <button className="button modal-save" type="button" onClick={() => savePrivacy(analysisPreference ? "optional" : "necessary")}>Salvar preferência local</button>
          </section>
        </div>
      )}
    </>
  );
}

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
